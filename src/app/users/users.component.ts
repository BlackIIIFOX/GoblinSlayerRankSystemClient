import { Component, OnInit } from '@angular/core';
import {User} from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user: User;

  constructor() { }

  ngOnInit(): void {

  }

}
