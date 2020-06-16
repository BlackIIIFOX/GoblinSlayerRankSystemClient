import {Component, OnInit} from '@angular/core';
import {AccountService, ContractsService} from '../core/services';
import {Observable} from 'rxjs';
import {Contract} from '../core/models/contract.model';
import {Rank, Role, User} from '../core/models';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-list-contracts',
  templateUrl: './list-contracts.component.html',
  styleUrls: ['./list-contracts.component.css']
})
export class ListContractsComponent implements OnInit {

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
        this.contractsService.refresh();

        if (this.currentUser$.role === Role.Adventurer) {
          this.contracts$ = this.contractsService.entities$.pipe(
            map(contact => contact.filter(item => this.adventurerHasAccess(this.currentUser$, item.minRank)))
          );
        } else if (this.currentUser$.role === Role.Customer) {
          this.contracts$ = this.contractsService.entities$.pipe(
            map(contact => contact.filter(item => item.customer === this.currentUser$.id))
          );
        } else {
          this.contracts$ = this.contractsService.entities$;
        }
      }
    );
  }

  /**
   * Проверить, имеет ли авантюрист доступ к контракту по уровню.
   * @param user авантюрист.
   * @param contractRank ранг контракта.
   */
  private adventurerHasAccess(user: User, contractRank: Rank): boolean {
    let adventurer = null;

    if (user.role === Role.Adventurer) {
      adventurer = user;
    }

    if (!adventurer) {
      return false;
    }

    return this.getRankPriority(adventurer.adventurerRank) <= this.getRankPriority(contractRank);
  }


  /**
   * Получить приоритет ранга (10 - минмальный приоритет). Чем ниже приорите, тем главнее ранг.
   * @param rank ранг
   * @return приорите ранга
   */
  private getRankPriority(rank: Rank): number {
    switch (rank) {
      case Rank.Porcelain:
        return 10;
      case Rank.Obsidian:
        return 9;
      case Rank.Steel:
        return 8;
      case Rank.Sapphire:
        return 7;
      case Rank.Emerald:
        return 6;
      case Rank.Ruby:
        return 5;
      case Rank.Bronze:
        return 4;
      case Rank.Silver:
        return 3;
      case Rank.Gold:
        return 2;
      case Rank.Platinum:
        return 1;
    }
  }

}
