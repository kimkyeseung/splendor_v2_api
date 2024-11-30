import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto, UpdateGameStateDto, PlayerMoveDto } from './game.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  async createGame(@Body() createGameDto: CreateGameDto) {
    return this.gameService.createGame(createGameDto);
  }

  @Get(':_id')
  async getGame(@Param('_id') _id: string) {
    return this.gameService.getGameByRoomId(_id);
  }

  @Get(':roomId/state')
  async getGameState(@Param('roomId') roomId: string) {
    const game = await this.gameService.getGameByRoomId(roomId);
    return game.boardState;
  }

  @Put(':roomId/state')
  async updateGameState(
    @Param('roomId') roomId: string,
    @Body() updateGameStateDto: UpdateGameStateDto,
  ) {
    return this.gameService.updateGameState(roomId, updateGameStateDto);
  }

  @Post(':roomId/move')
  async playerMove(
    @Param('roomId') roomId: string,
    @Body() playerMoveDto: PlayerMoveDto,
  ) {
    return this.gameService.playerMove(roomId, playerMoveDto);
  }
}
