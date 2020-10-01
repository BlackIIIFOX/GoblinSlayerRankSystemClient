import {Component, OnInit} from '@angular/core';
import {AccountService} from '../core/services';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
  }

}
