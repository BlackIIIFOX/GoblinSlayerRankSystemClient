import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User, UserUpdate} from '../../core/models';
import {ToastService, UsersService} from '../../core/services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserCreateComponent} from './user-create/user-create.component';
import {UserUpdateComponent} from './user-update/user-update.component';

@Component({
  selector: 'app-users',
  templateUrl: './management-users.component.html',
  styleUrls: ['./management-users.component.css']
})
export class ManagementUsersComponent implements OnInit {

  users$: Observable<User[]>;
  total$: Observable<number>;
  // tslint:disable-next-line:variable-name
  _usernameFilter: string;

  set usernameFilter(value: string) {
    this._usernameFilter = value;
    this.service.searchFilter.set('username', value);
    this.service.refresh();
  }

  get usernameFilter(): string {
    return this._usernameFilter;
  }

  constructor(public service: UsersService,
              private toastService: ToastService,
              private modalService: NgbModal) {
    this.users$ = this.service.entities$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
  }

  createUser() {
    this.modalService.open(UserCreateComponent).result.then(result => {
      this.service.refresh();
    }, error => {
      // TODO: отобразить пользователю ошибку
    });
  }

  onEdit(id: number) {
    this.service.getById(id).subscribe(userInfo => {
      const modalEdit = this.modalService.open(UserUpdateComponent);
      modalEdit.componentInstance.user = userInfo;
      modalEdit.result.then(() => this.service.refresh());
    }, error => {
      // TODO: отобразить пользователю ошибку
    });
  }

  onBlockHandle(user: User) {
    const updateInfo: UserUpdate = {
      address: user.address, isBlocked: !user.isBlocked, name: user.name, roles: user.roles
    };

    this.service.updateUser(user.id, updateInfo).subscribe(res => {
      // this.service.refresh();
      const result = res.isBlocked === true ? 'Пользователь заблокирован' : 'Пользователь разблокирован';
      this.toastService.show('', result);
      user.isBlocked = res.isBlocked;
    }, error => {
      this.toastService.show('', 'Ошибка блокировки');
    });
  }
}
