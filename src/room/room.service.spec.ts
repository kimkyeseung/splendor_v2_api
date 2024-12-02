import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomService } from './room.service';
import { Room } from './room.schema';

const mockRoom = {
  _id: 'mockRoomId',
  name: 'Test Room',
  players: [],
};

const mockRoomModel = {
  find: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue([mockRoom]),
  }),
  findOne: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockRoom),
  }),
  create: jest.fn().mockReturnValue(mockRoom),
  save: jest.fn().mockResolvedValue(mockRoom),
  deleteOne: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
  }),
};

describe('RoomService', () => {
  let service: RoomService;
  let model: Model<Room>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomService,
        {
          provide: getModelToken(Room.name),
          useValue: mockRoomModel,
        },
      ],
    }).compile();

    service = module.get<RoomService>(RoomService);
    model = module.get<Model<Room>>(getModelToken(Room.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllRooms', () => {
    it('should return an array of rooms', async () => {
      const rooms = await service.getAllRooms();
      expect(rooms).toEqual([mockRoom]);
      expect(model.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('getRoomById', () => {
    it('should return a single room by ID', async () => {
      const room = await service.getRoomById('mockRoomId');
      expect(room).toEqual(mockRoom);
      expect(model.findOne).toHaveBeenCalledWith({ _id: 'mockRoomId' });
    });
  });

  describe('deleteRoom', () => {
    it('should delete a room by ID', async () => {
      const deleteResult = { deletedCount: 1 };
      jest.spyOn(model, 'deleteOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(deleteResult),
      } as any);

      await service.deleteRoom('mockRoomId');
      expect(model.deleteOne).toHaveBeenCalledWith({ _id: 'mockRoomId' });
    });

    it('should log when no room is deleted', async () => {
      const deleteResult = { deletedCount: 0 };
      jest.spyOn(model, 'deleteOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(deleteResult),
      } as any);
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      await service.deleteRoom('nonExistentRoomId');
      expect(consoleSpy).toHaveBeenCalledWith(
        `Room nonExistentRoomId not found in the database.`,
      );
      consoleSpy.mockRestore();
    });
  });
});
