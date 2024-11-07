import { Controller, Post, Body, BadRequestException, InternalServerErrorException, NotFoundException, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../auth/dtos/create-user.dto';
import { LoginUserDto } from '../auth/dtos/login-user.dto'; 
import { randomInt } from 'crypto';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  


}
