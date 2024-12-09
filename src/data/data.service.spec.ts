import { Test, TestingModule } from '@nestjs/testing';
import { DataService } from './data.service';

describe('GameDataService', () => {
  let service: DataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataService],
    }).compile();

    service = module.get<DataService>(DataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return development cards', () => {
    const devCards = service.getDevelopmentCards();
    expect(Array.isArray(devCards)).toBe(true);
    expect(devCards.length).toBeGreaterThan(0);
  });

  it('should return noble tiles', () => {
    const nobleTiles = service.getNobleTiles();
    expect(Array.isArray(nobleTiles)).toBe(true);
    expect(nobleTiles.length).toBeGreaterThan(0);
  });
});
