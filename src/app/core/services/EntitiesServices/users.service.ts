import {Injectable, PipeTransform} from '@angular/core';
import {
  Credentials, Role,
  SearchResultPagination,
  User
} from '../../models';
import {Observable, of, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {BaseEntityService} from './base-entity.service';
import {UserCreate} from '../../models/user-create.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseEntityService<User> {

  protected matches(user: User, term: string): boolean {
    return true;
  }

  protected search(): Observable<SearchResultPagination<User>> {
    return this.getAll('/users');
  }

  getById(id: number) {
    return this.apiService.get(`/users/${id}`);
  }

  createUser(newUser: UserCreate) {

    // return throwError(new Error('Пошел нах'));

    // TODO: mock, потом убрать
    const user: User = {
      user_address: newUser.user_address,
      user_is_blocked: false,
      user_name: newUser.user_name,
      user_id: 1,
      user_login: newUser.user_login,
      user_role: newUser.user_role,
      image: 'https://funpay.ru/img/layout/avatar.png'
    };

    return of(user);
    // return this.apiService.post('/users', newUser);
  }

  // updateUser(id: number, info: UserUpdateInfo) {
  //   return this.apiService.put(`/users/${id}`, info);
  // }
}
