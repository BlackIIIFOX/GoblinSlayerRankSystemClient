import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Contract} from '../core/models/contract.model';
import {Adventurer, AdventurerStatus, Rank} from '../core/models';
import {AdventurersService} from '../core/services';
import {Router} from '@angular/router';
import {UserUpdateComponent} from '../admin-panel/management-users/user-update/user-update.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AdventurerRankEditorComponent} from '../adventurer-rank-editor/adventurer-rank-editor.component';

@Component({
  selector: 'app-distributor-dashboard',
  templateUrl: './distributor-dashboard.component.html',
  styleUrls: ['./distributor-dashboard.component.css']
})
export class DistributorDashboardComponent implements OnInit {

  public ranks = Object.values(Rank);
  public adventurerStatus = Object.values(AdventurerStatus);
  public adventurers$: Observable<Adventurer[]>;
  // tslint:disable-next-line:variable-name
  private _nameFilter: string;
  // tslint:disable-next-line:variable-name
  private _rankFilter: Rank;
  // tslint:disable-next-line:variable-name
  private _adventurerStatusFilter: AdventurerStatus;
  public selectedAdventurer: Adventurer;

  constructor(public adventurersService: AdventurersService, private router: Router, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.adventurersService.searchFilter.clear();
    this.adventurers$ = this.adventurersService.entities$;
    this.adventurersService.pageSize = 12;
    this.adventurersService.refresh();
  }

  set nameFilter(value: string) {
    this._nameFilter = value;

    if (this._nameFilter) {
      this.adventurersService.searchFilter.set('username', this._nameFilter);
    } else {
      this.adventurersService.searchFilter.delete('username');
    }
  }

  get nameFilter(): string {
    return this._nameFilter;
  }

  set rankFilter(value: Rank) {
    this._rankFilter = value;

    if (this._rankFilter) {
      this.adventurersService.searchFilter.set('rank', this._rankFilter);
    } else {
      this.adventurersService.searchFilter.delete('rank');
    }
  }

  get rankFilter(): Rank {
    return this._rankFilter;
  }

  set adventurerStatusFilter(value: AdventurerStatus) {
    this._adventurerStatusFilter = value;

    if (this._adventurerStatusFilter) {
      this.adventurersService.searchFilter.set('status', this._adventurerStatusFilter);
    } else {
      this.adventurersService.searchFilter.delete('status');
    }
  }

  get adventurerStatusFilter(): AdventurerStatus {
    return this._adventurerStatusFilter;
  }

  clearSearch() {
    this.adventurersService.searchFilter.clear();
    this.nameFilter = null;
    this.rankFilter = null;
    this.adventurerStatusFilter = null;
    this.adventurersService.refresh();
  }

  search() {
    this.adventurersService.refresh();
  }

  selectAdventurer($event: MouseEvent, adventurer: Adventurer) {
    this.selectedAdventurer = adventurer;
  }

  editRank(adventurer: Adventurer) {
    const modalEdit = this.modalService.open(AdventurerRankEditorComponent);
    modalEdit.componentInstance.adventurer = adventurer;
    modalEdit.result.then(() => this.adventurersService.refresh());
  }
}
