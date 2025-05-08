import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { RoomModule } from '../src/room/room.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from '../src/room/room.schema';

let app: INestApplication;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [
      MongooseModule.forRoot(globalThis.dbUri),
      MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
      RoomModule,
    ],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();
});

describe('게임 전체 흐름 테스트', () => {
  it('방을 생성하면 201이 반환되고 목록에 포함되어야 한다', async () => {
    const roomDto = { title: 'Test Room', password: '1234' };

    // 방 생성
    const createRes = await request(app.getHttpServer())
      .post('/room')
      .send(roomDto);

    expect(createRes.status).toBe(201);

    // 목록 확인
    const listRes = await request(app.getHttpServer()).get('/room');
    expect(listRes.status).toBe(200);
    expect(listRes.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ title: 'Test Room' })]),
    );
  });
});
