import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './game.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  async createGame(@Body() createGameDto: CreateGameDto) {
    return this.gameService.createGame(createGameDto);
  }

  @Get(':roomId')
  async getGame(@Param('roomId') roomId: string) {
    return this.gameService.getGameByRoomId(roomId);
  }

  @Put(':roomId')
  async updateGame(
    @Param('roomId') roomId: string,
    @Body() updateDto: { boardState: object },
  ) {
    return this.gameService.updateGame(roomId, updateDto.boardState);
  }
}
