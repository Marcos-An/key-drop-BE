import { Module } from "@nestjs/common";
import { UploadFileService } from "./uploadFile.service";
import { UploadFileController } from "./upload.controller";

@Module({
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {}
