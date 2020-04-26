import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GoblinSlayerRankSystemClient';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.populate();
  }



}
