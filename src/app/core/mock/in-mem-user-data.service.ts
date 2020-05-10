import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {User} from '../models';

@Injectable({
  providedIn: 'root'
})
export class InMemUserDataService implements InMemoryDbService {
  createDb() {
    const users = [
      {id: 1, email: 'admin', token: '1234123', name: 'Admin', bio: 'admin', image: undefined},
      // {id: 2, email: 'goblin_slayer'},
      // {id: 3, email: 'guild_girl'}
    ];

    return {users};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (1).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(hero => hero.user_id)) + 1 : 1;
  }
}
