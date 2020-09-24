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
  ContractsService,
  AdventurersService
} from './services';
import {NotificationService} from './services/notification.service';

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
    ContractsService,
    AdventurersService,
    NotificationService
  ]
})
export class CoreModule {
}
