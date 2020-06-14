import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from './core';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemUserDataService} from './core/mock';
import {WelcomeComponent} from './welcome/welcome.component';

import {
  FooterComponent,
  HeaderComponent,
  SharedModule
} from './shared';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AdminPanelComponent} from './admin-panel';
import {MainContentComponent} from './main-content/main-content.component';
import {AuthComponent} from './auth/auth.component';
import {DashboardComponent} from './admin-panel/dashboard/dashboard.component';
import {UserUpdateComponent} from './admin-panel/management-users/user-update/user-update.component';
import {UserCreateComponent} from './admin-panel/management-users/user-create/user-create.component';
import {ManagementUsersComponent} from './admin-panel/management-users/management-users.component';
import { AdventurerRegistrationComponent } from './adventurer-registration/adventurer-registration.component';
import { ContractorRegistrationComponent } from './contractor-registration/contractor-registration.component';
import { ToastsComponent } from './toasts/toasts.component';
import { CreateNewContractComponent } from './create-new-contract/create-new-contract.component';
import { ListContractsComponent } from './list-contracts/list-contracts.component';
import { ContractDetailsComponent } from './contract-details/contract-details.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    FooterComponent,
    HeaderComponent,
    AdminPanelComponent,
    MainContentComponent,
    AuthComponent,
    DashboardComponent,
    ManagementUsersComponent,
    UserUpdateComponent,
    UserCreateComponent,
    AdventurerRegistrationComponent,
    ContractorRegistrationComponent,
    ToastsComponent,
    CreateNewContractComponent,
    ListContractsComponent,
    ContractDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule,
    ReactiveFormsModule,

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
