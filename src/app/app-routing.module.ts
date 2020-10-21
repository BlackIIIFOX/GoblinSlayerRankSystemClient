import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {AdminPanelComponent} from './admin-panel';
import {MainContentComponent} from './main-content/main-content.component';
import {AuthComponent} from './auth/auth.component';
import {DashboardComponent} from './admin-panel/dashboard/dashboard.component';
import {ManagementUsersComponent} from './admin-panel/management-users/management-users.component';
import {RegistrationComponent} from './registration/registration.component';
import {CreateNewContractComponent} from './create-new-contract/create-new-contract.component';
import {MyListContractsComponent} from './my-list-contracts/my-list-contracts.component';
import {ContractDetailsEditorComponent} from './contract-details-editor/contract-details-editor.component';
import {AllListContractsComponent} from './all-list-contracts/all-list-contracts.component';
import {AdventurerDashboardComponent} from './adventurer-dashboard/adventurer-dashboard.component';
import {AdventurersStatementsComponent} from './adventurers-statements/adventurers-statements.component';
import {MyNotificationsComponent} from './my-notifications/my-notifications.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {RegistrarDashboardComponent} from './registrar-dashboard/registrar-dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: 'content', pathMatch: 'full'},
  {
    path: 'content',
    component: MainContentComponent,
    children: [
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: 'welcome', component: WelcomeComponent},
      {path: 'contractor-registration', component: RegistrationComponent},
      {path: 'adventurer-registration', component: RegistrationComponent},
      {path: 'login', component: AuthComponent},
      {path: 'create-new-contract', component: CreateNewContractComponent},
      {path: 'my-contracts', component: MyListContractsComponent},
      {path: 'registrar-dashboard', component: RegistrarDashboardComponent},
      {path: 'contracts/:id', component: ContractDetailsEditorComponent},
      {path: 'my-contracts/:id', component: ContractDetailsEditorComponent},
      {path: 'adventurer-dashboard', component: AdventurerDashboardComponent},
      {path: 'adventurers-statements', component: AdventurersStatementsComponent},
      {path: 'profile/notifications', component: MyNotificationsComponent},
      {path: 'profile/settings', component: AccountSettingsComponent}
    ]
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    children: [
      {path: '', redirectTo: 'statistic', pathMatch: 'full'},
      {path: 'statistic', component: DashboardComponent},
      {
        path: 'management',
        children: [
          {path: '', redirectTo: 'users', pathMatch: 'full'},
          {path: 'users', component: ManagementUsersComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preload all modules; optionally we could
    // implement a custom preloading strategy for just some
    // of the modules (PRs welcome 😉)
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
