import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {UserService} from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getTestUser().subscribe(data => {
      this.user = data;
    });
  }

}
