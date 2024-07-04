import { Controller, Get, Param, ParseUUIDPipe, Query } from "@nestjs/common";
import { SkinsService } from "./skins.service";
import { IsPublic } from "src/common/decorators/is-public.decorator";
import { SkinEntity } from "./entities/skin.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Skins")
@Controller("skins")
export class SkinsController {
  constructor(private readonly skinsService: SkinsService) {}

  @IsPublic()
  @Get()
  async findAll(
    @Query("name")
    name?: string,
    @Query("weapon")
    weapon?: string,
    @Query("limit")
    limit?: number,
    @Query("page")
    page?: number,
  ): Promise<SkinEntity[]> {
    return await this.skinsService.findAll({ name, weapon, limit, page });
  }

  @IsPublic()
  @Get(":uuid")
  async findOne(
    @Param("uuid", new ParseUUIDPipe()) uuid: string,
  ): Promise<SkinEntity> {
    return await this.skinsService.findOne(uuid);
  }
}
