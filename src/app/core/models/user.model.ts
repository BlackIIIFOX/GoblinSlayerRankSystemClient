import {Role} from './roles';
import {Rank} from './ranks';

export interface User {
  user_id: number;
  user_login: string;
  user_name: string;
  user_address: string;
  user_role: Role;
  image: string;
  user_is_blocked: boolean;
}
