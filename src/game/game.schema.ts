import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Game extends Document {
  @Prop({ required: true })
  roomId: string;

  @Prop({ default: [] })
  players: string[];

  @Prop({ type: Object, default: {} })
  boardState: Record<string, any>;
}

export const GameSchema = SchemaFactory.createForClass(Game);
