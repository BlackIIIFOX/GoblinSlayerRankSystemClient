import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ListErrorsComponent} from './layout';
import {ContractStatusPipe} from './contract-status.pipe';

@NgModule({
  declarations: [ListErrorsComponent, ContractStatusPipe],
  exports: [
    ListErrorsComponent,
    ContractStatusPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule {
}
