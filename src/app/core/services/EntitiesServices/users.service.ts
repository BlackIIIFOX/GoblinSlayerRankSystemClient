import {Injectable} from '@angular/core';
import {SearchResultPagination, User, CustomerCreate, AdminCreate, AdventurerCreate, UserUpdate} from '../../models';
import {Observable} from 'rxjs';
import {BaseEntityService} from './base-entity.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseEntityService<User> {

  protected matches(user: User, term: string): boolean {
    return user.username.toLowerCase().includes(term.toLowerCase())
      || user.name?.toLowerCase().includes(term.toLowerCase());
  }

  protected search(): Observable<SearchResultPagination<User>> {
    return this.getAll('/admin/users/');
  }

  getById(id: number): Observable<User> {
    return this.apiService.get(`/users/${id}`);
  }

  createCustomer(newUser: CustomerCreate) {
    return this.apiService.post('/users/', newUser);
  }

  createAdventurer(newUser: AdventurerCreate) {
    return this.apiService.post('/adventurers/', newUser);
  }

  createUser(newUser: AdminCreate) {
    return this.apiService.post('/admin/users/', newUser);
  }

  updateUser(id: number, info: UserUpdate) {
    return this.apiService.put(`/admin/users/${id}`, info);
  }
}
