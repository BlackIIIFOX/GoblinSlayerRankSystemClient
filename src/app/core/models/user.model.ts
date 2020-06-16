import {Role} from './roles';
import {Rank} from './ranks';
import {AdventurerStatus} from './adventurer-status';

export interface User {
  id: number;
  login: string;
  name: string;
  address: string;
  role: Role;
  image: string;
  blocked: boolean;
  adventurerStatus: AdventurerStatus;
  adventurerExperience: number;
  adventurerRank: Rank;
}
