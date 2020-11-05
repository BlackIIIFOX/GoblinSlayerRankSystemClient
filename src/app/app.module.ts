import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from './core';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
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
import {RegistrationComponent} from './registration/registration.component';
import {ToastsComponent} from './toasts/toasts.component';
import {CreateNewContractComponent} from './create-new-contract/create-new-contract.component';
import {MyListContractsComponent} from './my-list-contracts/my-list-contracts.component';
import {ContractDetailsEditorComponent} from './contract-details-editor/contract-details-editor.component';
import {AllListContractsComponent} from './all-list-contracts/all-list-contracts.component';
import { AdventurerDashboardComponent } from './adventurer-dashboard/adventurer-dashboard.component';
import { AdventurersStatementsComponent } from './adventurers-statements/adventurers-statements.component';
import { MyNotificationsComponent } from './my-notifications/my-notifications.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RegistrarDashboardComponent } from './registrar-dashboard/registrar-dashboard.component';
import { ContractItemComponent } from './contract-item/contract-item.component';
import { DistributorDashboardComponent } from './distributor-dashboard/distributor-dashboard.component';
import { AdventurerRankEditorComponent } from './adventurer-rank-editor/adventurer-rank-editor.component';

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
    RegistrationComponent,
    ToastsComponent,
    CreateNewContractComponent,
    MyListContractsComponent,
    AllListContractsComponent,
    ContractDetailsEditorComponent,
    AdventurerDashboardComponent,
    AdventurersStatementsComponent,
    MyNotificationsComponent,
    AccountSettingsComponent,
    RegistrarDashboardComponent,
    ContractItemComponent,
    DistributorDashboardComponent,
    AdventurerRankEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
