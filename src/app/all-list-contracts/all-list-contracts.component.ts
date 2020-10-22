import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AccountService, AdventurersService, ContractsService} from '../core/services';
import {Observable, Subscription} from 'rxjs';
import {Contract} from '../core/models/contract.model';
import {Adventurer, ContractStatus, Rank, Role, User} from '../core/models';
import {map} from 'rxjs/operators';
import validate = WebAssembly.validate;

@Component({
  selector: 'app-all-list-contracts',
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
  // tslint:disable-next-line:variable-name
  private _rankFilter: Rank;
  public contractStatus = Object.values(ContractStatus);
  public ranks = Object.values(Rank);
  private accountSubscription: Subscription;
  // tslint:disable-next-line:variable-name
  private _showOnlyMyContracts: boolean;

  // Отображать ли список контрактов с фильтрами для авантюриста
  @Input() isListForAdventurer: boolean;

  @Input() adventurerInfo: Adventurer;

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

        if (this.isListForAdventurer) {
          this.showOnlyMyContracts = true;
          const index = this.ranks.indexOf(this.adventurerInfo.rank, 0);
          this.ranks.splice(0, index);
        }

        this.contractsService.refresh();
        this.contracts$ = this.contractsService.entities$;
      }
    );
  }

  set showOnlyMyContracts(value: boolean) {
    this._showOnlyMyContracts = value;

    if (this._showOnlyMyContracts) {
      this.contractsService.searchFilter.delete('contractStatus');
      this.contractsService.searchFilter.set('executor', this.adventurerInfo.id.toString());
      this.minRankFilter = null;
    } else {
      this.contractsService.searchFilter.set('contractStatus', ContractStatus.Accepted);
      this.contractsService.searchFilter.delete('executor');
      this.minRankFilter = this.adventurerInfo.rank;
    }
  }

  get showOnlyMyContracts(): boolean {
    return this._showOnlyMyContracts;
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

  set rankFilter(value: Rank) {
    this._rankFilter = value;

    if (this._rankFilter) {
      this.contractsService.searchFilter.set('rank', this._rankFilter);
    } else {
      this.contractsService.searchFilter.delete('rank');
    }
  }

  get rankFilter(): Rank {
    return this._rankFilter;
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

    if (this.isListForAdventurer) {
      this.showOnlyMyContracts = this.showOnlyMyContracts;
    } else {
      this.contractStatusFilter = null;
    }

    this.nameContractFilter = null;
    this.rankFilter = null;
    this.contractsService.refresh();
  }

  search() {
    this.contractsService.refresh();
  }

  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
  }
}
