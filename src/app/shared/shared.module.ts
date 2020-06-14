import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ListErrorsComponent} from './layout';
import {ContractStatusPipe} from './contract-status.pipe';
import { RankPipe } from './rank.pipe';

@NgModule({
  declarations: [ListErrorsComponent, ContractStatusPipe, RankPipe],
  exports: [
    ListErrorsComponent,
    ContractStatusPipe,
    RankPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule {
}
