import {Component, Input, OnInit} from '@angular/core';
import {Contract} from '../core/models/contract.model';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-contract-item',
    templateUrl: './contract-item.component.html',
    styleUrls: ['./contract-item.component.css']
})
export class ContractItemComponent implements OnInit {

    @Input() contract: Contract;

    apiUrl: string;

    constructor() {
        this.apiUrl = environment.api_url;
    }

    ngOnInit(): void {
    }

}
