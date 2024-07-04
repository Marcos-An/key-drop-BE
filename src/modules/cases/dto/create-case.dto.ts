import { ApiProperty } from "@nestjs/swagger";
import { IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ContentDto } from "./content.dto";

export class CreateCaseDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty({ type: [ContentDto] })
  @ValidateNested({ each: true })
  @Type(() => ContentDto)
  content: Partial<ContentDto>[];
}
