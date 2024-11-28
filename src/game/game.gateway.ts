import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';

@WebSocketGateway({ cors: true }) // CORS 설정
export class GameGateway {
  constructor(private readonly gameService: GameService) {}

  @WebSocketServer()
  server: Server; // WebSocket 서버 인스턴스

  // 클라이언트가 연결될 때 처리
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // 클라이언트가 연결 해제될 때 처리
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // 특정 방에 참여
  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody('roomId') roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(roomId); // 소켓 클라이언트를 특정 방에 추가
    console.log(`Client ${client.id} joined room ${roomId}`);
  }

  // 플레이어의 움직임 처리
  @SubscribeMessage('playerMove')
  async handlePlayerMove(
    @MessageBody() data: { roomId: string; playerId: string; action: string },
  ) {
    const { roomId, playerId, action } = data;

    // 게임 로직 처리
    const updatedGame = await this.gameService.playerMove(roomId, {
      playerId,
      action,
      data: {}, // 예: 행동에 필요한 추가 데이터
    });

    // 특정 방에 업데이트된 상태를 브로드캐스트
    this.server.to(roomId).emit('updateGameState', updatedGame.boardState);
  }
}
