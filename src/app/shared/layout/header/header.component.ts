import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService, ContractNotification, User} from '../../../core';
import {Role} from '../../../core';
import {Router} from '@angular/router';
import {NotificationService} from '../../../core/services/notification.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  public currentUser: User;
  public RoleEnum = Role;

  // For xs devices.
  public isMenuCollapsed = true;
  public isLoggedIn = false;
  public contractNotifications: ContractNotification[] = [];
  private subscription: Subscription = new Subscription();
  private notificationsSubscription: Subscription;

  constructor(private userService: AccountService, public router: Router, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    const subscriptionAuthenticated = this.userService.isAuthenticated.subscribe(
      isAuth => {
        this.isLoggedIn = isAuth;
      },
      error => {
      }
    );
    this.subscription.add(subscriptionAuthenticated);

    const subscriptionStarted = this.notificationService.$isStarted.subscribe(isStarted => {
      if (isStarted) {
        this.notificationsSubscription = this.notificationService.$contractNotifications.subscribe(contractNotifications => {
          if (contractNotifications) {
            this.contractNotifications = contractNotifications;
          }
        });

        this.subscription.add(this.notificationsSubscription);
      } else {
        this.subscription.remove(this.notificationsSubscription);
        this.notificationsSubscription?.unsubscribe();
      }
    });
    this.subscription.add(subscriptionStarted);

    const subscriptionCurrentUser = this.userService.currentUser.subscribe(
      (userData) => {
        if (userData) {
          this.currentUser = userData;
        }
      }
    );
    this.subscription.add(subscriptionCurrentUser);
  }

  logOut() {
    this.userService.logOut();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
