import { Module } from "@nestjs/common";
import {
  UserController,
  LoginController,
} from "./controllers";
import { DataServicesModule } from "./services/data-services/data-services.module";
import { UserUseCasesModule } from "./use-cases/user/user-use-cases.module";
import { BcryptServicesModule } from "./services";
import { LoginUseCasesModule } from "./use-cases/login/login-use-cases.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./core/strategy/jwt.strategy";
import { join } from "path";
import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
  imports: [
      ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      serveRoot: "/uploads",
    }),
    PassportModule,
    JwtModule.register({
      secret: "your-secret-key",
      signOptions: { expiresIn: "1d" },
    }),

    DataServicesModule,
    UserUseCasesModule,
    BcryptServicesModule,
    LoginUseCasesModule,
  ],
  providers: [JwtStrategy],
  controllers: [
    UserController,
    LoginController,
  ],
})
export class AppModule {}
