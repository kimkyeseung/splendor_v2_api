import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from '../../src/room/room.service';

interface User {
  _id: string;
  nickname: string;
}

interface Player extends User {
  socketId: string;
  isReady: boolean;
}

@WebSocketGateway({
  cors: {
    origin: (origin, callback) => {
      const allowedOrigins = ['http://localhost:3000', 'http://example.com'];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly roomService: RoomService) {}

  private clientRoomMap: Map<string, string> = new Map(); // 방 데이터
  private games: Record<string, any> = {}; // 게임 데이터
  private roomPlayersMap: Map<string, Player[]> = new Map();

  getPlayers(roomId: string) {
    return this.roomPlayersMap.get(roomId) || [];
  }

  setPlayers(roomId: string, players: Player[]) {
    if (players.length === 0) {
      this.roomPlayersMap.delete(roomId);
      this.roomService.deleteRoom(roomId);
    } else {
      this.roomPlayersMap.set(roomId, players);
      this.server.to(roomId).emit('playerListUpdated', players);
    }
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const clientRoomId = this.clientRoomMap.get(client.id);
    client.leave(clientRoomId);
    this.clientRoomMap.delete(client.id);

    console.log(`Client disconnected: ${client.id}`);

    let players = this.getPlayers(clientRoomId);
    players = players.filter((p) => p.socketId !== client.id);
    this.setPlayers(clientRoomId, players);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() data: { roomId: string; user: User },
    @ConnectedSocket() client: Socket,
  ) {
    const { roomId, user } = data;
    console.log(`Client ${client.id} joined Room: ${roomId}`);
    client.join(roomId);
    this.clientRoomMap.set(client.id, roomId);

    const players = this.getPlayers(roomId);

    const isHostPlayer: boolean = players.length === 0;

    const player: Player = {
      ...user,
      socketId: client.id,
      isReady: isHostPlayer,
    };
    players.push(player);
    this.setPlayers(roomId, players);
  }

  @SubscribeMessage('startGame')
  async handleStartGame(
    @MessageBody() data: { roomId: string; gameId: string },
  ) {
    const { roomId, gameId } = data;

    this.server.to(roomId).emit('gameStarted', gameId);
  }

  @SubscribeMessage('toggleReady')
  async handleToggleReady(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { roomId } = data;
    let players = this.getPlayers(roomId);
    players = players.map((p) =>
      p.socketId === client.id ? { ...p, isReady: !p.isReady } : p,
    );
    this.setPlayers(roomId, players);
  }

  @SubscribeMessage('gameAction')
  handleGameAction(
    @MessageBody() data: { roomId: string; action: any },
    @ConnectedSocket() client: Socket,
  ) {
    const { roomId, action } = data;
    if (!this.games[roomId]) return;

    console.log(client, action);

    // 게임 상태 업데이트 로직
    this.server.to(roomId).emit('gameStateUpdated', this.games[roomId]);
  }
}
