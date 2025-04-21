import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { nickname } = createUserDto;

    if (!nickname || nickname.trim().length === 0) {
      throw new BadRequestException('닉네임은 필수입니다.');
    }

    const newUser = await this.usersService.createUser(nickname);
    return newUser;
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.findAllUsers();
    return users;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.usersService.findUserById(id);
    if (!user) {
      throw new BadRequestException('사용자를 찾을 수 없습니다.');
    }
    return user;
  }
}
