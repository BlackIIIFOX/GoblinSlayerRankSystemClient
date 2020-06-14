import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Contract} from '../core/models/contract.model';
import {delay, switchMap} from 'rxjs/operators';
import {ContractsService} from '../core/services';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.css']
})
export class ContractDetailsComponent implements OnInit {

  contract$: Observable<Contract>;

  constructor( private route: ActivatedRoute,
               private router: Router,
               private contractsService: ContractsService) { }

  ngOnInit(): void {
    this.contract$ = this.route.paramMap.pipe(
      // delay(1000),
      switchMap(params => this.contractsService.getById(Number(params.get('id'))))
    );
  }

}
