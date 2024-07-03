import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "@prisma/client";
import { IsPublic } from "src/common/decorators/is-public.decorator";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @IsPublic()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findOne(@Query() createUserDto: Partial<User>) {
    return this.userService.findOne(createUserDto);
  }
}
