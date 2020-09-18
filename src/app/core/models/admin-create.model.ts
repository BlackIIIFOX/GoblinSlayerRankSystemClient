import {Role} from './roles';

export interface AdminCreate {
  username: string;
  password: string;
  name: string;
  address: string;
  roles: Array<Role>;
}
