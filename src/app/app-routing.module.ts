import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {AdminPanelComponent} from './admin-panel';
import {MainContentComponent} from './main-content/main-content.component';
import {AuthComponent} from './auth/auth.component';
import {DashboardComponent} from './admin-panel/dashboard/dashboard.component';
import {ManagementUsersComponent} from './admin-panel/management-users/management-users.component';

const routes: Routes = [
  {path: '', redirectTo: 'content', pathMatch: 'full'},
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'register',
    component: AuthComponent
  },
  {
    path: 'content',
    component: MainContentComponent,
    children: [
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: 'welcome', component: WelcomeComponent}
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
