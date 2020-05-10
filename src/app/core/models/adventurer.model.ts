import {User} from './user.model';
import {AdventurerStatus} from './adventurer-status';
import {AdventurerRank} from './adventurer-rank';

export interface Adventurer extends User {
  adventurer_status: AdventurerStatus;
  adventurer_experience: number;
  rank_name: AdventurerRank;
}
