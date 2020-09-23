import {Component, OnInit} from '@angular/core';
import {AdventurersService, ToastService} from '../core/services';
import {Observable} from 'rxjs';
import {Adventurer, AdventurerStatus} from '../core/models';

@Component({
  selector: 'app-adventurers-statements',
  templateUrl: './adventurers-statements.component.html',
  styleUrls: ['./adventurers-statements.component.css']
})
export class AdventurersStatementsComponent implements OnInit {
  $adventurers: Observable<Adventurer[]>;

  constructor(private adventurersService: AdventurersService, private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.adventurersService.pageSize = this.adventurersService.maxPageSize;
    this.adventurersService.searchFilter.set('status', AdventurerStatus.NotConfirmed);
    this.adventurersService.refresh();
    this.$adventurers = this.adventurersService.entities$;
  }

  accept(adventurer: Adventurer) {
    this.adventurersService.updateAdventurerStatus(adventurer.id, AdventurerStatus.Active).subscribe(
      () => this.adventurersService.refresh(),
      exception => this.toastService.show('', 'Произошла ошибка на сервере')
    );
  }

  reject(adventurer: Adventurer) {
    this.adventurersService.updateAdventurerStatus(adventurer.id, AdventurerStatus.Rejected).subscribe(
      () => this.adventurersService.refresh(),
      exception => this.toastService.show('', 'Произошла ошибка на сервере')
    );
  }
}
