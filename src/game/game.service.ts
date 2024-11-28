import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from './game.schema';
import { CreateGameDto } from './game.dto';

@Injectable()
export class GameService {
  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}

  async createGame(dto: CreateGameDto): Promise<Game> {
    const game = new this.gameModel(dto);
    return game.save();
  }

  async getGameByRoomId(roomId: string): Promise<Game> {
    return this.gameModel.findOne({ roomId }).exec();
  }

  async updateGame(roomId: string, boardState: object): Promise<Game> {
    return this.gameModel.findOneAndUpdate(
      { roomId },
      { boardState },
      { new: true },
    );
  }
}
