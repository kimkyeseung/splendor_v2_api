import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  nickname: string;
  createdAt: Date;
  lastActiveAt: Date;
}

export const UserSchema = new Schema<IUser>({
  nickname: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
  lastActiveAt: { type: Date, default: Date.now },
});

export const User = model<IUser>('User', UserSchema);
