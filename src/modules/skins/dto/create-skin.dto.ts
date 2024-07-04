import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateSkinDto {
  @ApiProperty()
  @IsString()
  full_name: string;

  @ApiProperty()
  pattern_name: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsString()
  rarity: string;

  @ApiProperty()
  @IsString()
  weapon: string;
}
