import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from "@nestjs/common";
import { CasesService } from "./cases.service";
import { CreateCaseDto } from "./dto/create-case.dto";
import { UpdateCaseDto } from "./dto/update-case.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Cases")
@Controller("cases")
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Post()
  async create(@Body() createCaseDto: CreateCaseDto) {
    return await this.casesService.create(createCaseDto);
  }

  @Get()
  async findAll(
    @Query("title")
    title?: string,
    @Query("limit")
    limit?: number,
    @Query("page")
    page?: number,
  ) {
    return await this.casesService.findAll({ title, limit, page });
  }

  @Get(":uuid")
  async findOne(@Param("uuid", new ParseUUIDPipe()) uuid: string) {
    return await this.casesService.findOne(uuid);
  }

  @Patch(":uuid")
  async update(
    @Param("uuid", new ParseUUIDPipe()) uuid: string,
    @Body() updateCaseDto: UpdateCaseDto,
  ) {
    return await this.casesService.update(uuid, updateCaseDto);
  }

  @Delete(":uuid")
  async remove(@Param("uuid", new ParseUUIDPipe()) uuid: string) {
    return this.casesService.remove(uuid);
  }
}
