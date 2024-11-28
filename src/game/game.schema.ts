import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Player {
  id: string;
  name: string;
  tokens: number;
}

@Schema()
export class Game extends Document {
  @Prop({ required: true })
  roomId: string;

  @Prop({ default: [] })
  players: Player[];

  @Prop({ type: Object, default: {} })
  boardState: Record<string, any>;
}

export const GameSchema = SchemaFactory.createForClass(Game);
