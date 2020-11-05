import {Pipe, PipeTransform} from '@angular/core';
import {AdventurerStatus} from '../core/models';

@Pipe({
  name: 'adventurerStatus'
})
export class AdventurerStatusPipe implements PipeTransform {

  transform(value: AdventurerStatus, ...args: unknown[]): string {
    switch (value) {
      case AdventurerStatus.Rejected:
        return 'Отклонен';
      case AdventurerStatus.Active:
        return 'Подтвержен';
      case AdventurerStatus.Dead:
        return 'Погиб';
      case AdventurerStatus.NotConfirmed:
        return 'Не подтвержден';
      default:
        throw Error(`Adventurer status ${value} not supported`);
    }
  }
}
