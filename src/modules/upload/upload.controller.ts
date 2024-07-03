import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { UploadService } from "./upload.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { IsPublic } from "src/common/decorators/is-public.decorator";
import { FileDto } from "./dto/upload-file.dto";
import { UploadedFileEntity } from "./entities/supabase-file.entity";

@Controller("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @IsPublic()
  @Post("/")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(@UploadedFile() file: FileDto): Promise<UploadedFileEntity> {
    const result = await this.uploadService.upload(file);

    return result;
  }
}
