import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/services/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { UserEntity } from "./entities/user-entity";
import { User } from "@prisma/client";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const existUser = this.prisma.user.findFirst({
      where: { email: createUserDto.email },
    });

    if (existUser) {
      throw new HttpException(
        "Email is already in use",
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdUser = await this.prisma.user.create({ data });

    return { ...createdUser, password: undefined };
  }

  async findOne(
    where: Partial<User>,
  ): Promise<Partial<UserEntity | undefined>> {
    return await this.prisma.user.findFirst({ where });
  }
}
