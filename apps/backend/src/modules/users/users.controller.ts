import { UsersService } from './users.service';
import { Controller, Post, Body, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return this.usersService.listUsers();
  }

  @Post()
  async createUser(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name: string,
  ) {
    return this.usersService.createUser(email, password, name);
  }
}
