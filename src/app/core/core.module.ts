import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {HttpTokenInterceptor} from './interceptors';

import {
  ApiService,
  JwtService,
  AccountService,
  AuthGuard,
  UsersService,
  ToastService,
  ContractsService
} from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true},
    JwtService,
    AccountService,
    ApiService,
    AuthGuard,
    UsersService,
    ToastService,
    ContractsService
  ]
})
export class CoreModule {
}
