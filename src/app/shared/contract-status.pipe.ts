import { Pipe, PipeTransform } from '@angular/core';
import {ContractStatus} from '../core/models';
import {ParseArgumentException} from '@angular/cli/models/parser';

@Pipe({
  name: 'contractStatus'
})
export class ContractStatusPipe implements PipeTransform {

  transform(value: ContractStatus, ...args: unknown[]): string {
    switch (value) {
      case ContractStatus.Created:
        return 'Подан';
      case ContractStatus.Rejected:
        return 'Отклонен';
      case ContractStatus.Payment:
        return 'Оплата';
      case ContractStatus.Accepted:
        return 'Принят';
      case ContractStatus.Performing:
        return 'В процессе';
      case ContractStatus.Performed:
        return 'Исполнен';
      case ContractStatus.Payout:
        return 'Выплата вознагрождения';
      case ContractStatus.Completed:
        return 'Завершен';
      default:
          throw new Error(`Transform not implemented for ${value}`);
    }
  }

}
