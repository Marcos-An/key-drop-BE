import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileDto } from "./dto/upload-file.dto";
import { UploadedFileEntity } from "./entities/supabase-file.entity";
import { UploadFileService } from "./uploadFile.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Upload Files")
@Controller("upload")
export class UploadFileController {
  constructor(private readonly uploadService: UploadFileService) {}

  @Post("/")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(@UploadedFile() file: FileDto): Promise<UploadedFileEntity> {
    const result = await this.uploadService.upload(file);

    return result;
  }
}
