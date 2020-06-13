import { Pipe, PipeTransform } from '@angular/core';
import {ContractStatus} from '../core/models';

@Pipe({
  name: 'contractStatus'
})
export class ContractStatusPipe implements PipeTransform {

  transform(value: ContractStatus, ...args: unknown[]): string {
    switch (value) {
      case ContractStatus.Accepted:
        return 'Принят';
      case ContractStatus.Completed:
        return 'Завершен';
      case ContractStatus.Filed:
        return 'Подан';
      case ContractStatus.OnProcessing:
        return 'В процессе';
      case ContractStatus.Performed:
        return 'Исполнен';
      case ContractStatus.Rejected:
        return 'Отклонен';
    }
  }

}
