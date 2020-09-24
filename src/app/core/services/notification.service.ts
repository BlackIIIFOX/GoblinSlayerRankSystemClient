import {Injectable} from '@angular/core';
import {AccountService} from './account.service';
import {BehaviorSubject, interval, Observable, Subscription} from 'rxjs';
import {ApiService} from './api.service';
import {startWith, switchMap} from 'rxjs/operators';
import {ContractNotification, Notification} from '../models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private timeoutUpdateMs = 5000;
  private isStarted: boolean;
  // tslint:disable-next-line:variable-name
  private _contractNotifications = new BehaviorSubject<ContractNotification[]>([]);
  private $notificationObservable: Observable<Notification>;
  private subscriptionNotification: Subscription;

  constructor(private apiService: ApiService) {
    console.log('service');
    this.$notificationObservable = interval(this.timeoutUpdateMs)
      .pipe(
        startWith(0),
        switchMap(() => this.apiService.get(`/account/notifications/`)),
      );
  }

  public startService() {
    if (this.isStarted) {
      throw new Error('Service already started');
    }

    this.subscriptionNotification = this.$notificationObservable.subscribe(notification => {
      this._contractNotifications.next(notification.contractNotifications);
    });
    this.isStarted = true;
  }

  public stopService() {
    this.subscriptionNotification?.unsubscribe();
    this.isStarted = false;
  }

  public getContractNotificationObservable(): Observable<ContractNotification[]> {
    if (!this.isStarted) {
      throw new Error('Service not started');
    }

    return this._contractNotifications.asObservable();
  }

  public confirmContractNotification(idNotification: number): Observable<void> {
    return this.apiService.post(`/account/notifications/contract-notifications/${idNotification}`);
  }
}
