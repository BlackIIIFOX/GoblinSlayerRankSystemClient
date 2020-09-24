import {Component, OnInit} from '@angular/core';
import {AccountService, ContractNotification, User} from '../../../core';
import {Role} from '../../../core';
import {Router} from '@angular/router';
import {NotificationService} from '../../../core/services/notification.service';

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
  public contractNotifications: ContractNotification[] = [];

  constructor(private userService: AccountService, public router: Router, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.userService.isAuthenticated.subscribe(
      isAuth => {
        this.isLoggedIn = isAuth;

        if (this.isLoggedIn) {
          this.notificationService.startService();
          this.notificationService.getContractNotificationObservable().subscribe(contractNotifications => {
            this.contractNotifications = contractNotifications;
          });
        } else {
          this.notificationService.stopService();
        }
      },
      error => {
      }
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
