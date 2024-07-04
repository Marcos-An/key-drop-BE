import { Module } from "@nestjs/common";
import { PrismaModule } from "./services/prisma/prisma.module";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./modules/auth/guards/jtw-auth.guard";
import { UploadFileModule } from "./modules/uploadFile/uploadFile.module";
import { SkinsModule } from './modules/skins/skins.module';
import { CasesModule } from './modules/cases/cases.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    AuthModule,
    UploadFileModule,
    SkinsModule,
    CasesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
