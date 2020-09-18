import {Rank} from './ranks';
import {ContractStatus} from './contract-status';

export interface ContractUpdate {
  executor: number;
  reward: number;
  minRank: Rank;
  address: string;
  contractStatus: ContractStatus;
  description: string;
  requestComment: string;
  registrarComment: string;
}
