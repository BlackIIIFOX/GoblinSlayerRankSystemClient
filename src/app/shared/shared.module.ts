import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { ListErrorsComponent } from './layout';

@NgModule({
    declarations: [ListErrorsComponent],
    exports: [
      ListErrorsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
    ]
})
export class SharedModule { }
