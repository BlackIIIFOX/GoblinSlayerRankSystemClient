import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {CoreModule} from './core';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemUserDataService} from './core/mock';
import {WelcomeComponent} from './welcome/welcome.component';
import {AuthModule} from './auth/auth.module';

import {
  FooterComponent,
  HeaderComponent,
  SharedModule
} from './shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    FooterComponent,
    HeaderComponent,
    AdminPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule,
    AuthModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemUserDataService, {dataEncapsulation: false}
    ),

    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
