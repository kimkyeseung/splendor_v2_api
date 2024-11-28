import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './room.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async getAllRooms() {
    return this.roomService.getAllRooms(); // 전체 방 목록 반환
  }

  @Post()
  async createGame(@Body() createGameDto: CreateRoomDto) {
    return this.roomService.createRoom(createGameDto);
  }

  @Get(':_id')
  async getRoom(@Param('_id') roomId: string) {
    return this.roomService.getRoomById(roomId);
  }
}
