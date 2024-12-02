import { Controller, Get } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
  constructor(private readonly gameDataService: DataService) {}

  @Get('development-cards')
  getDevelopmentCards() {
    return this.gameDataService.getDevelopmentCards();
  }

  @Get('noble-tiles')
  getNobleTiles() {
    return this.gameDataService.getNobleTiles();
  }
}
