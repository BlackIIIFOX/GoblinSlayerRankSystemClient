import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {HttpTokenInterceptor} from './interceptors';
import {InMemUserDataService} from './mock';

import {
  JwtService,
  UserService
} from './services';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true},
    UserService,
    JwtService
  ]
})
export class CoreModule { }
