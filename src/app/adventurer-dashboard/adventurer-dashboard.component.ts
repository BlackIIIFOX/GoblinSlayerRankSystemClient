import {Component, OnInit} from '@angular/core';
import {AccountService, AdventurersService} from '../core/services';
import {Adventurer, AdventurerStatus} from '../core/models';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-adventurer-dashboard',
  templateUrl: './adventurer-dashboard.component.html',
  styleUrls: ['./adventurer-dashboard.component.css']
})
export class AdventurerDashboardComponent implements OnInit {
  public AdventurerStatus = AdventurerStatus;

  private adventurersService: AdventurersService;
  private accountsService: AccountService;
  public $adventurer: Observable<Adventurer>;

  constructor(adventurersService: AdventurersService, accountsService: AccountService) {
    this.adventurersService = adventurersService;
    this.accountsService = accountsService;
  }

  ngOnInit(): void {
    this.accountsService.currentUser.subscribe(user => {
      if (user) {
        this.$adventurer = this.adventurersService.getById(user.id);
      }
    });
  }
}
