import {ContractStatus} from './contract-status';
import {Time} from '@angular/common';

export interface ContractNotification {
  id: number;
  contractId: number;
  contractName: string;
  contractOldStatus: ContractStatus;
  contractNewStatus: ContractStatus;
  executor: number;
  customer: number;
  createTime: Time;
}
