import {Component, OnInit} from '@angular/core';
import {AccountService, User} from '../../../core';
import {Role} from '../../../core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  public currentUser: User;
  public RoleEnum = Role;

  // For xs devices.
  public isMenuCollapsed = true;
  public isLoggedIn = false;

  constructor(private userService: AccountService) {
  }

  ngOnInit(): void {
    this.userService.isAuthenticated.subscribe(
      isAuth => this.isLoggedIn = isAuth
    );

    this.userService.currentUser.subscribe(
      (userData) => {
        if (userData) {
          this.currentUser = userData;
        }
      }
    );
  }

  logOut() {
    this.userService.logOut();
  }
}
