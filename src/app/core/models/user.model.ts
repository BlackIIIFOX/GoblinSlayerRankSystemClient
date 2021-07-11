import {Role} from './roles';

export interface User {
  id: number;
  username: string;
  name: string;
  address: string;
  roles: Array<Role>;
  isBlocked: boolean;
  avatar: number;
}
