import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from './room.service';

@WebSocketGateway({ cors: true }) // CORS 설정
export class GameGateway {
  constructor(private readonly gameService: RoomService) {}

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
}
