import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async createUser(nickname: string): Promise<IUser> {
    const newUser = new this.userModel({
      nickname,
      createdAt: new Date(),
      lastActiveAt: new Date(),
    });
    return await newUser.save();
  }

  async findUserById(id: string): Promise<IUser | null> {
    return await this.userModel.findById(id).exec();
  }

  async updateLastActive(id: string): Promise<IUser | null> {
    return await this.userModel.findByIdAndUpdate(
      id,
      { lastActiveAt: new Date() },
      { new: true },
    );
  }

  async findAllUsers(): Promise<IUser[]> {
    return await this.userModel.find().exec();
  }
}
