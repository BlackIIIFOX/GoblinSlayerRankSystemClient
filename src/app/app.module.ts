import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { FormsModule} from '@angular/forms';
import {Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './users/user.service';

const routes: Routes = [
  {path: 'users', component: UsersComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
