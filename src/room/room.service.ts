import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './room.schema';
import { CreateRoomDto } from './room.dto';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  async getAllRooms(): Promise<Room[]> {
    return this.roomModel.find().exec(); // MongoDB에서 모든 게임 데이터 반환
  }

  async getRoomById(_id: string): Promise<Room> {
    return this.roomModel.findOne({ _id }).exec();
  }

  async createRoom(dto: CreateRoomDto): Promise<Room> {
    const room = new this.roomModel(dto);
    return room.save();
  }

  async deleteRoom(roomId: string): Promise<void> {
    const result = await this.roomModel.deleteOne({ _id: roomId }).exec();
    if (result.deletedCount > 0) {
      console.log(`Room ${roomId} successfully deleted from the database.`);
    } else {
      console.log(`Room ${roomId} not found in the database.`);
    }
  }
}
