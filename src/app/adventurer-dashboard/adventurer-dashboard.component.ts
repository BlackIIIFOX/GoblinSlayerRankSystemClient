import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService, AdventurersService} from '../core/services';
import {Adventurer, AdventurerStatus} from '../core/models';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-adventurer-dashboard',
  templateUrl: './adventurer-dashboard.component.html',
  styleUrls: ['./adventurer-dashboard.component.css']
})
export class AdventurerDashboardComponent implements OnInit, OnDestroy {
  public AdventurerStatus = AdventurerStatus;

  private adventurersService: AdventurersService;
  private accountsService: AccountService;
  public $adventurer: Observable<Adventurer>;
  private accountSubscription: Subscription;

  constructor(adventurersService: AdventurersService, accountsService: AccountService) {
    this.adventurersService = adventurersService;
    this.accountsService = accountsService;
  }

  ngOnInit(): void {
    this.accountSubscription = this.accountsService.currentUser.subscribe(user => {
      if (user) {
        this.$adventurer = this.adventurersService.getById(user.id);
      }
    });
  }

  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
  }
}
