import {Component, Input, OnInit} from '@angular/core';
import {Contract} from '../core/models/contract.model';

@Component({
  selector: 'app-contract-item',
  templateUrl: './contract-item.component.html',
  styleUrls: ['./contract-item.component.css']
})
export class ContractItemComponent implements OnInit {

  @Input() contract: Contract;

  constructor() {
  }

  ngOnInit(): void {
  }

}
