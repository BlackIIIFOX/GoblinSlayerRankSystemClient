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
    return user.user_login.toLowerCase().includes(term.toLowerCase())
      || user.user_name?.toLowerCase().includes(term.toLowerCase())
      || user.user_role.toString().toLowerCase().includes(term.toLowerCase());
  }

  protected search(): Observable<SearchResultPagination<User>> {
    const {pageSize, page, searchTerm} = this.state;

    const testUsers = [];

    const user1: User = {
      user_address: 'Центральный город',
      user_is_blocked: false,
      user_name: 'Пупкин Василий',
      user_id: 1,
      user_login: 'pupkin@gmail.com',
      user_role: Role.Adventurer,
      image: 'https://funpay.ru/img/layout/avatar.png'
    };

    const user2: User = {
      user_address: 'Центральный город',
      user_is_blocked: false,
      user_name: 'BlackIIIFOX',
      user_id: 2,
      user_login: 'admin@gmail.com',
      user_role: Role.Admin,
      image: 'https://funpay.ru/img/layout/avatar.png'
    };


    testUsers.push(user1, user2);

    return of(testUsers)
      .pipe(
        map(
          entityMap => ({
            entities: entityMap.filter(
              entity => this.matches(entity, searchTerm)
            ).slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize), total: entityMap.length
          } as SearchResultPagination<User>)
        )
      );

    // TODO: потом вернуть
    // return this.getAll('/users');
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
