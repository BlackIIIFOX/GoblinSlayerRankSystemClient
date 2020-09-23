import {AdventurerStatus} from './adventurer-status';
import {Rank} from './ranks';

export interface Adventurer {
  id: number;
  username: string;
  name: string;
  address: string;
  status: AdventurerStatus;
  experience: number;
  rank: Rank;
  reason: string;
}
