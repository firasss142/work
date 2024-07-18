import { Module } from "@nestjs/common";
import {AbstractMailerService} from "../../core/abstracts/mailer-services.abstract"
import { MailerService } from "./mailer-services.service";

@Module({
  providers: [
    {
      provide: AbstractMailerService,
      useClass: MailerService,
    },
  ],
  exports: [AbstractMailerService],
})
export class MailerModule {}
