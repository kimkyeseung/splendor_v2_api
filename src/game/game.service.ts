import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from './game.schema';
import { CreateGameDto, UpdateGameStateDto, PlayerMoveDto } from './game.dto';
import { DataService } from '../data/data.service';
import { shuffle } from 'lodash';

const getTokensByPlayers = (playerCount: number) => {
  const tokenCount = playerCount === 2 ? 4 : playerCount === 3 ? 5 : 7;

  return {
    yellow: 5,
    red: tokenCount,
    blue: tokenCount,
    green: tokenCount,
    black: tokenCount,
    white: tokenCount,
  };
};

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<Game>,
    private readonly dataService: DataService,
  ) {}

  async createGame({ players, roomId }: CreateGameDto): Promise<Game> {
    const lev1Cards = shuffle(this.dataService.getDevelopmentCards(1));
    const lev2Cards = shuffle(this.dataService.getDevelopmentCards(2));
    const lev3Cards = shuffle(this.dataService.getDevelopmentCards(3));
    const tokens = getTokensByPlayers(players.length);

    const nobles = shuffle(this.dataService.getNobleTiles()).slice(
      0,
      players.length + 1,
    );

    const game = new this.gameModel({
      lev1Cards,
      lev2Cards,
      lev3Cards,
      tokens,
      nobles,
      roomId,
      players,
    });
    return game.save();
  }

  async getGameByRoomId(_id: string): Promise<Game> {
    return this.gameModel.findOne({ _id }).exec();
  }

  async updateGameState(
    roomId: string,
    dto: UpdateGameStateDto,
  ): Promise<Game> {
    return this.gameModel.findOneAndUpdate(
      { roomId },
      { boardState: dto.boardState },
      { new: true },
    );
  }

  async playerMove(roomId: string, dto: PlayerMoveDto): Promise<Game> {
    const game = await this.gameModel.findOne({ roomId }).exec();

    if (!game) {
      throw new Error('Game not found');
    }

    return game.save();
  }
}
