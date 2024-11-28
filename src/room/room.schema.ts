import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Room extends Document {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  password?: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
