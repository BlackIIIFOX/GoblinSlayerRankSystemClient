import {Component, OnInit} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {AccountService} from '../core/services';
import {User} from '../core/models';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  images = [
    './assets/img/welcome_test.jpg',
    './assets/img/welcome_test2.jpg',
    './assets/img/welcome_page_slider_squad.jpg'];
  public currentUser: User;

  constructor(config: NgbCarouselConfig, public accountService: AccountService) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    this.images[2] = './assets/img/welcome_test.jpg';
  }

  ngOnInit(): void {
    this.accountService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

}
