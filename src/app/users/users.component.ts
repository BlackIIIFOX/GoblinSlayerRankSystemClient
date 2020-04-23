import { Component, OnInit } from '@angular/core';
import {User} from '../core/models';
import {UserService} from '../core/services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser(1).subscribe(data => {
      this.user = data;
    });
  }

}
