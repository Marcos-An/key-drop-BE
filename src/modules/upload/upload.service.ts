import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FileDto } from "./dto/upload-file.dto";
import { createClient } from "@supabase/supabase-js";
import { UploadedFileEntity } from "./entities/supabase-file.entity";

@Injectable()
export class UploadService {
  async upload(file: FileDto): Promise<UploadedFileEntity> {
    const SUPABESE = createClient(
      process.env.SUPABESE_URL,
      process.env.SUPABESE_KEY,
      {
        auth: {
          persistSession: false,
        },
      },
    );

    const { data } = await SUPABESE.storage
      .from("keydrop")
      .upload(file.originalname, file.buffer, {
        upsert: true,
      });

    const url = await SUPABESE.storage
      .from("keydrop")
      .createSignedUrl(data.path, 2592000); // link expire one month

    if (url.error) {
      throw new HttpException(
        "Something went wrong with your URL",
        HttpStatus.BAD_REQUEST,
      );
    }

    return { path: url.data.signedUrl };
  }
}
