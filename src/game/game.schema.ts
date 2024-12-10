import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DevelopmentCard, NobleTile, Tokens } from 'src/types';

export interface Player {
  _id: string;
  nickname: string;
}

@Schema()
export class Game extends Document {
  @Prop({ required: true })
  roomId: string;

  @Prop({ default: [] })
  players: Player[];

  @Prop([Object])
  lev1Cards: DevelopmentCard[];

  @Prop([Object])
  lev2Cards: DevelopmentCard[];

  @Prop([Object])
  lev3Cards: DevelopmentCard[];

  @Prop([Object])
  nobles: NobleTile[];

  @Prop({ type: Object })
  tokens: Tokens = {
    yellow: 0,
    red: 0,
    blue: 0,
    black: 0,
    white: 0,
    green: 0,
  };
}

export const GameSchema = SchemaFactory.createForClass(Game);
