import {ContractStatus} from './contract-status';

export interface ContractCreate {
  customer: number;
  nameContract: string;
  reward: number;
  address: string;
  description: string;
  requestComment: string;
}
