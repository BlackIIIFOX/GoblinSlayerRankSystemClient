import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ShowAuthedDirective} from './show-authed.directive';

@NgModule({
  declarations: [ShowAuthedDirective],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
