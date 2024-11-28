export class CreateGameDto {
  readonly roomId: string;
  readonly players: string[];
  readonly boardState: object;
}
