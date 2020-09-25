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
  private contractNotificationsSubject;
  private $notificationObservable: Observable<Notification>;
  private subscriptionNotification: Subscription;
  private isStartedSubject = new BehaviorSubject<boolean>(false);
  private contractNotificationsCash: ContractNotification[];

  constructor(private apiService: ApiService) {
    this.contractNotificationsSubject = new BehaviorSubject<ContractNotification[]>(this.contractNotificationsCash);
    this.$notificationObservable = interval(this.timeoutUpdateMs)
      .pipe(
        startWith(0),
        switchMap(() => this.apiService.get(`/account/notifications/`)),
      );
  }

  public get $isStarted(): Observable<boolean> {
    return this.isStartedSubject.asObservable();
  }

  public get $contractNotifications(): Observable<ContractNotification[]> {
    if (!this.isStarted) {
      throw new Error('Service not started');
    }

    return this.contractNotificationsSubject.asObservable();
  }

  public startService() {
    if (this.isStarted) {
      throw new Error('Service already started');
    }

    this.subscriptionNotification = this.$notificationObservable.subscribe(notification => {
      this.contractNotificationsCash = notification.contractNotifications;

      this.contractNotificationsSubject.next(this.contractNotificationsCash);
    });
    this.isStarted = true;
    this.isStartedSubject.next(this.isStarted);
  }

  public stopService() {
    this.subscriptionNotification?.unsubscribe();
    this.isStarted = false;
    this.isStartedSubject.next(this.isStarted);
  }

  public confirmContractNotification(idNotification: number): Observable<void> {
    this.contractNotificationsCash = this.contractNotificationsCash.filter(notification => notification.id !== idNotification);
    this.contractNotificationsSubject.next(this.contractNotificationsCash);

    return this.apiService.post(`/account/notifications/contract-notifications/${idNotification}`);
  }
}
