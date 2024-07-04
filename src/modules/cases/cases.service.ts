import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateCaseDto } from "./dto/create-case.dto";
import { UpdateCaseDto } from "./dto/update-case.dto";
import { PrismaService } from "src/services/prisma/prisma.service";
import { Content, Prisma } from "@prisma/client";

@Injectable()
export class CasesService {
  constructor(private prisma: PrismaService) {}

  async create(createCaseDto: CreateCaseDto) {
    const existCase = await this.prisma.case.findFirst({
      where: { title: createCaseDto.title },
    });

    if (existCase) {
      throw new HttpException(
        "Case with this name already exists",
        HttpStatus.CONFLICT,
      );
    }

    const createdCase = await this.prisma.case.create({
      data: {
        title: createCaseDto.title,
        image: createCaseDto.image,
        content: {
          create: createCaseDto.content.map((content) => ({
            percentage: content.percentage,
            skin: {
              connect: { uuid: content.skinUuid },
            },
          })),
        },
      },
      include: {
        content: {
          include: {
            skin: true,
          },
        },
      },
    });

    return createdCase;
  }

  async findAll({
    title,
    limit,
    page,
  }: {
    title: string;
    limit: number;
    page: number;
  }) {
    const skip = limit && page ? Math.abs(page - 1) * limit : undefined;
    const where: Prisma.CaseWhereInput = {};

    if (title) {
      where.OR = [
        {
          title: {
            contains: title,
            mode: "insensitive",
          },
        },
      ];
    }

    const allCases = await this.prisma.case.findMany({
      where,
      include: {
        content: {
          include: {
            skin: true,
          },
        },
      },
      skip: skip ? skip : 0,
      take: limit ? Number(limit) : 10,
    });

    return allCases;
  }

  async findOne(uuid: string) {
    return await this.prisma.case.findUnique({ where: { uuid } });
  }

  async update(uuid: string, updateCaseDto: UpdateCaseDto) {
    const existingCase = await this.prisma.case.findUnique({
      where: { uuid },
      include: { content: true },
    });

    if (!existingCase) {
      throw new HttpException("Case doesn't exists", HttpStatus.NO_CONTENT);
    }

    const toCreate: Partial<Content>[] = [];
    const toEdit: Partial<Content>[] = [];
    const toDelete: Content[] = [...existingCase.content];

    updateCaseDto.content.forEach((updateContent) => {
      const existingIndex = existingCase.content.findIndex(
        (content) => content.uuid === updateContent?.uuid,
      );

      if (existingIndex === -1) {
        // Se não existir no banco de dados, marca para criação
        toCreate.push(updateContent);
      } else {
        // Se existir, marca para edição
        toEdit.push(updateContent);
        // Remove da lista de exclusão
        toDelete.splice(existingIndex, 1);
      }
    });

    const updatedCase = await this.prisma.case.update({
      where: { uuid },
      data: {
        title: updateCaseDto.title,
        image: updateCaseDto.image,
        content: {
          update: toEdit.map((content) => ({
            where: { uuid: content.uuid },
            data: content,
          })),
          create: toCreate.map((content) => ({
            percentage: content.percentage,
            skin: {
              connect: { uuid: content.skinUuid },
            },
          })),
          deleteMany: {
            uuid: { in: toDelete.map((content) => content.uuid) },
          },
        },
      },
      include: {
        content: {
          include: {
            skin: true,
          },
        },
      },
    });

    return updatedCase;
  }

  async remove(uuid: string) {
    return await this.prisma.$transaction(async (prisma) => {
      const existingCase = await prisma.case.findUnique({
        where: { uuid },
        include: { content: true },
      });

      if (!existingCase) {
        throw new HttpException("Case doesn't exist", HttpStatus.NO_CONTENT);
      }

      return await prisma.case.delete({
        where: { uuid },
      });
    });
  }
}
