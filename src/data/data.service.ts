import { Injectable } from '@nestjs/common';
import * as developmentCards from './development-cards.json';
import * as nobleTiles from './noble-tiles.json';

@Injectable()
export class DataService {
  private readonly devCards = developmentCards;
  private readonly nobles = nobleTiles;

  getDevelopmentCards(grade?: number) {
    if (grade) {
      return this.devCards.filter((c) => c.grade === grade);
    }
    return this.devCards;
  }

  getNobleTiles() {
    return this.nobles;
  }
}
