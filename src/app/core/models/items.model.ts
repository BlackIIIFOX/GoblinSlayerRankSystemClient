import {Rank} from './ranks';
import {ContractStatus} from './contract-status';

export interface Items<Entity> {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  items: Array<Entity>;
}
