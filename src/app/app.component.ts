import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GoblinSlayerRankSystemClient';

  constructor(public router: Router, private userService: AccountService) {
  }

  ngOnInit(): void {
    this.userService.populate();
  }



}
