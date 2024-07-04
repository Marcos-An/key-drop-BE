import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class ContentDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  uuid?: string;

  @ApiProperty()
  @IsNumber()
  percentage: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  caseUuid?: string;

  @ApiProperty()
  @IsString()
  skinUuid: string;
}
