import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ListErrorsComponent} from './layout';
import {ContractStatusPipe} from './contract-status.pipe';
import { RankPipe } from './rank.pipe';
import { AdventurerStatusPipe } from './adventurer-status.pipe';

@NgModule({
  declarations: [ListErrorsComponent, ContractStatusPipe, RankPipe, AdventurerStatusPipe],
    exports: [
        ListErrorsComponent,
        ContractStatusPipe,
        RankPipe,
        AdventurerStatusPipe
    ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule {
}
