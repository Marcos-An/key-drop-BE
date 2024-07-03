import { Module } from "@nestjs/common";
import { PrismaModule } from "./services/prisma/prisma.module";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./modules/auth/guards/jtw-auth.guard";
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, AuthModule, UploadModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
