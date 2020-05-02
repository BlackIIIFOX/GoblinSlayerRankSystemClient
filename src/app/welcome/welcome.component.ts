import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  // images = [1, 2, 3].map(() => `https://picsum.photos/1920/1080?random&t=${Math.random()}`);
  images = [
    './assets/img/welcome_test.jpg',
    './assets/img/welcome_test2.jpg',
    './assets/img/welcome_page_slider_squad.jpg'];

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    this.images[2] = './assets/img/welcome_test.jpg';
  }

  ngOnInit(): void {

  }

}
