import { Module } from "@nestjs/common";
import { AbstractJwtService } from "src/core";
import { JwtService } from "./jwt-services.services";

@Module({
  providers: [
    {
      provide: AbstractJwtService,
      useClass: JwtService,
    },
  ],
  exports: [AbstractJwtService],
})
export class JwtModule {}
