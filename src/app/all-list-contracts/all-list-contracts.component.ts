import {Component, OnInit} from '@angular/core';
import {AccountService, ContractsService} from '../core/services';
import {Observable} from 'rxjs';
import {Contract} from '../core/models/contract.model';
import {Rank, Role, User} from '../core/models';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-list-contracts',
  templateUrl: './all-list-contracts.component.html',
  styleUrls: ['./all-list-contracts.component.css']
})
export class AllListContractsComponent implements OnInit {

  public contracts$: Observable<Contract[]>;
  public currentUser$: User;

  constructor(private contractsService: ContractsService, private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountService.currentUser.subscribe(currentUser => {
        if (!currentUser) {
          console.error('currentUser is null');
          return;
        }

        console.log('Current user: ' + currentUser.id);

        this.currentUser$ = currentUser;

        console.log('Id:' + currentUser.id);

        this.contractsService.searchFilter.clear();
        this.contractsService.pageSize = 2147483647;
        this.contractsService.refresh();
        this.contracts$ = this.contractsService.entities$;
      }
    );
  }

}
