import {Pipe, PipeTransform} from '@angular/core';
import {Rank} from '../core/models';

@Pipe({
  name: 'rank'
})
export class RankPipe implements PipeTransform {

  transform(value: Rank, ...args: unknown[]): string {
    switch (value) {
      case Rank.Platinum:
        return 'Ранг 1: Платиновый';
      case Rank.Gold:
        return 'Ранг 2: Золотой';
      case Rank.Silver:
        return 'Ранг 3: Серебрянный';
      case Rank.Bronze:
        return 'Ранг 4: Бронзовый';
      case Rank.Ruby:
        return 'Ранг 5: Рубиновый';
      case Rank.Emerald:
        return 'Ранг 6: Изумрудный';
      case Rank.Sapphire:
        return 'Ранг 7: Сапфировый';
      case Rank.Steel:
        return 'Ранг 8: Стальной';
      case Rank.Obsidian:
        return 'Ранг 9: Обсидиановый';
      case Rank.Porcelain:
        return 'Ранг 10: Фарфоровый';
      default:
        throw Error(`Rank ${value} not supported`);
    }
  }

}
