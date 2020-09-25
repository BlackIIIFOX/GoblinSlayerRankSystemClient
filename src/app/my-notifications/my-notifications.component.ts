import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../core/services/notification.service';
import {ContractNotification} from '../core/models';

@Component({
  selector: 'app-my-notifications',
  templateUrl: './my-notifications.component.html',
  styleUrls: ['./my-notifications.component.css']
})
export class MyNotificationsComponent implements OnInit {

  public isLoading;
  public contractNotifications: ContractNotification[] = [];

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.notificationService.$isStarted.subscribe(isStartedService => {
      if (isStartedService) {
        this.notificationService.$contractNotifications.subscribe(contractNotifications => {
          if (contractNotifications) {
            this.isLoading = false;
            this.contractNotifications = contractNotifications;
          }
        });
      } else {
        this.isLoading = true;
      }
    });
  }

  accept(notification: ContractNotification) {
    this.notificationService.confirmContractNotification(notification.id).subscribe();
  }

  acceptAll() {
    for (const notification of this.contractNotifications) {
      this.notificationService.confirmContractNotification(notification.id).subscribe();
    }
  }
}
