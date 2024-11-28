import { Controller, Get, Req, Res } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('*')
  async handleGameServer(@Req() req: Request, @Res() res: Response) {
    const server = this.gameService.getServerInstance();
    server.app(req, res);
  }
}
