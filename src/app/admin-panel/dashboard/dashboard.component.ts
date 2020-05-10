import {Component, OnInit} from '@angular/core';

declare function reloadDashboard(): any; // just change here from arun answer.

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    reloadDashboard();
  }

}
