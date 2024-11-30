import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from './game.schema';
import { CreateGameDto, UpdateGameStateDto, PlayerMoveDto } from './game.dto';

@Injectable()
export class GameService {
  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}

  async createGame(dto: CreateGameDto): Promise<Game> {
    const game = new this.gameModel(dto);
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
