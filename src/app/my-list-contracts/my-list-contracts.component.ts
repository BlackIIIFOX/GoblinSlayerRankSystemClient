import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService, ContractsService} from '../core/services';
import {Observable, Subscription} from 'rxjs';
import {Contract} from '../core/models/contract.model';
import {User} from '../core/models';

@Component({
  selector: 'app-list-contracts',
  templateUrl: './my-list-contracts.component.html',
  styleUrls: ['./my-list-contracts.component.css']
})
export class MyListContractsComponent implements OnInit, OnDestroy {

  public contracts$: Observable<Contract[]>;
  public currentUser$: User;
  private accountSubscription: Subscription;

  constructor(private contractsService: ContractsService, private accountService: AccountService) {
  }

  ngOnInit(): void {
    console.log('create');
    this.accountSubscription = this.accountService.currentUser.subscribe(currentUser => {
        if (!currentUser) {
          console.error('currentUser is null');
          return;
        }

        console.log('Current user: ' + currentUser.id);

        this.currentUser$ = currentUser;

        console.log('Id:' + currentUser.id);

        this.contractsService.searchFilter.clear();
        this.contractsService.pageSize = 2147483647;
        this.contractsService.searchFilter.set('customer', currentUser.id.toString());
        this.contractsService.refresh();
        this.contracts$ = this.contractsService.entities$;
      }
    );
  }

  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
  }
}
