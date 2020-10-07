import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from '../core/services/notification.service';
import {ContractNotification} from '../core/models';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-my-notifications',
  templateUrl: './my-notifications.component.html',
  styleUrls: ['./my-notifications.component.css']
})
export class MyNotificationsComponent implements OnInit, OnDestroy {

  public isLoading;
  public contractNotifications: ContractNotification[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    const subscriptionStarted = this.notificationService.$isStarted.subscribe(isStartedService => {
      if (isStartedService) {
        const subscriptionContracts = this.notificationService.$contractNotifications.subscribe(contractNotifications => {
          if (contractNotifications) {
            this.isLoading = false;
            this.contractNotifications = contractNotifications;
          }
        });
        this.subscription.add(subscriptionContracts);
      } else {
        this.isLoading = true;
      }
    });
    this.subscription.add(subscriptionStarted);
  }

  accept(notification: ContractNotification) {
    this.notificationService.confirmContractNotification(notification.id).subscribe();
  }

  acceptAll() {
    for (const notification of this.contractNotifications) {
      this.notificationService.confirmContractNotification(notification.id).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
