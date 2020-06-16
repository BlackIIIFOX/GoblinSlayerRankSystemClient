import {ContractStatus} from './contract-status';

export interface ContractCreate {
  nameContract: string;
  reward: number;
  address: string;
  description: string;
  requestComment: string;
  customer: number;
  contractStatus: ContractStatus;
}
