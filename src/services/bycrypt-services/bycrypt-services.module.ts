import { Module } from "@nestjs/common";
import { BcryptModule } from "src/frameworks/bcrypt/bycrypt-services.module";

@Module({
  imports: [BcryptModule],
  exports: [BcryptModule],
})
export class BcryptServicesModule {}
