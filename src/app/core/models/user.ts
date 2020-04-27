import {Role} from './roles';

export interface User {
  id: number;
  email: string;
  role: Role;
  token: string;
  name: string;
  bio: string;
  image: string;
}
