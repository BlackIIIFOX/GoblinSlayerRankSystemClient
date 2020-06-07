import {Role} from './roles';

export interface UserCreate {
  user_login: string;
  user_password: string;
  user_name: string;
  user_address: string;
  user_role: Role;
}
