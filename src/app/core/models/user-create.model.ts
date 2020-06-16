import {Role} from './roles';

export interface UserCreate {
  login: string;
  password: string;
  name: string;
  address: string;
  role: Role;
}
