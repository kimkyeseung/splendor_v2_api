import { Injectable, OnModuleInit } from '@nestjs/common';
import { Server } from 'boardgame.io/server';
import { TicTacToe } from './splendor';
import { PostgresStore } from 'bgio-postgres';

const db = new PostgresStore(process.env.POSTGRESQL_URI);

@Injectable()
export class GameService implements OnModuleInit {
  private server: any;

  onModuleInit() {
    this.server = Server({ games: [TicTacToe], db });
  }

  getServerInstance() {
    return this.server;
  }
}
