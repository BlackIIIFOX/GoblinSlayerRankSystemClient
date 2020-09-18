import {Role} from './roles';

export interface UserUpdate {
  name: string;
  address: string;
  roles: Array<Role>;
  isBlocked: boolean;
}
