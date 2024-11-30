import { Player } from './game.schema';

export class CreateGameDto {
  readonly roomId: string;
  readonly players: Player[];
}

export class UpdateGameStateDto {
  readonly boardState: Record<string, any>;
}

export class PlayerMoveDto {
  readonly playerId: string;
  readonly action: string;
  readonly data: any;
}
