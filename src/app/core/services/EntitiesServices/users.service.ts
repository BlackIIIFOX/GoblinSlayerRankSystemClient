import {Injectable} from '@angular/core';
import {Rank, Role, SearchResultPagination, User} from '../../models';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {BaseEntityService} from './base-entity.service';
import {UserCreate} from '../../models/user-create.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseEntityService<User> {

  protected matches(user: User, term: string): boolean {
    return user.login.toLowerCase().includes(term.toLowerCase())
      || user.name?.toLowerCase().includes(term.toLowerCase())
      || user.role.toString().toLowerCase().includes(term.toLowerCase());
  }

  protected search(): Observable<SearchResultPagination<User>> {
    return this.getAll('/users');
  }

  getById(id: number) {
    return this.apiService.get(`/users/${id}`);
  }

  createUser(newUser: UserCreate) {
    return this.apiService.post('/users', newUser);
  }

  updateUser(id: number, info: User) {
    return this.apiService.put(`/users/${id}`, info);
  }
}
