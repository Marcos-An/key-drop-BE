import { Injectable } from "@nestjs/common";
import { SkinEntity } from "./entities/skin.entity";
import { PrismaService } from "src/services/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class SkinsService {
  constructor(private prisma: PrismaService) {}

  async findAll({
    name,
    weapon,
    limit,
    page,
  }: {
    name: string;
    weapon: string;
    limit: number;
    page: number;
  }): Promise<SkinEntity[]> {
    const skip = limit && page ? Math.abs(page - 1) * limit : undefined;
    const where: Prisma.SkinWhereInput = {};

    if (name || weapon) {
      where.OR = [
        {
          full_name: {
            contains: name,
            mode: "insensitive",
          },
        },
        {
          pattern_name: {
            contains: name,
            mode: "insensitive",
          },
        },
        {
          weapon: {
            contains: weapon,
            mode: "insensitive",
          },
        },
      ];
    }

    const allSkins = await this.prisma.skin.findMany({
      where,
      skip: skip ? skip : 0,
      take: limit ? Number(limit) : 10,
    });

    return allSkins.map((skin) => new SkinEntity(skin));
  }

  async findOne(uuid: string): Promise<SkinEntity> {
    const skin = await this.prisma.skin.findFirst({ where: { uuid } });

    return new SkinEntity(skin);
  }
}
