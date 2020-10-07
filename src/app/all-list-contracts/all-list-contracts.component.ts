import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService, ContractsService} from '../core/services';
import {Observable, Subscription} from 'rxjs';
import {Contract} from '../core/models/contract.model';
import {ContractStatus, Rank, Role, User} from '../core/models';
import {map} from 'rxjs/operators';
import validate = WebAssembly.validate;

@Component({
  selector: 'app-list-contracts',
  templateUrl: './all-list-contracts.component.html',
  styleUrls: ['./all-list-contracts.component.css']
})
export class AllListContractsComponent implements OnInit, OnDestroy {
  public contracts$: Observable<Contract[]>;
  public currentUser$: User;
  // tslint:disable-next-line:variable-name
  private _nameContractFilter: string;
  // tslint:disable-next-line:variable-name
  private _contractStatusFilter: ContractStatus;
  // tslint:disable-next-line:variable-name
  private _minRankFilter: Rank;
  public contractStatus = Object.values(ContractStatus);
  public ranks = Object.values(Rank);
  private accountSubscription: Subscription;

  constructor(public contractsService: ContractsService, private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountSubscription = this.accountService.currentUser.subscribe(currentUser => {
        if (!currentUser) {
          console.error('currentUser is null');
          return;
        }

        console.log('Current user: ' + currentUser.id);

        this.currentUser$ = currentUser;

        console.log('Id:' + currentUser.id);

        this.contractsService.pageSize = 6;
        this.contractsService.searchFilter.clear();
        this.contractsService.refresh();
        this.contracts$ = this.contractsService.entities$;
      }
    );
  }

  set nameContractFilter(value: string) {
    this._nameContractFilter = value;

    if (this._nameContractFilter) {
      this.contractsService.searchFilter.set('nameContract', this._nameContractFilter);
    } else {
      this.contractsService.searchFilter.delete('nameContract');
    }
  }

  get nameContractFilter(): string {
    return this._nameContractFilter;
  }

  get contractStatusFilter(): ContractStatus {
    return this._contractStatusFilter;
  }

  set contractStatusFilter(value: ContractStatus) {
    this._contractStatusFilter = value;

    if (this._contractStatusFilter) {
      this.contractsService.searchFilter.set('contractStatus', this._contractStatusFilter);
    } else {
      this.contractsService.searchFilter.delete('contractStatus');
    }
  }

  set minRankFilter(value: Rank) {
    this._minRankFilter = value;

    if (this._minRankFilter) {
      this.contractsService.searchFilter.set('minRank', this._minRankFilter);
    } else {
      this.contractsService.searchFilter.delete('minRank');
    }
  }

  get minRankFilter(): Rank {
    return this._minRankFilter;
  }

  clearSearch() {
    this.contractsService.searchFilter.clear();
    this.nameContractFilter = null;
    this.minRankFilter = null;
    this.contractStatusFilter = null;
    this.contractsService.refresh();
  }

  search() {
    this.contractsService.refresh();
  }

  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
  }
}
