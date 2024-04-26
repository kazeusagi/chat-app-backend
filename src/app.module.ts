import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestService } from './test.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [TestService],
})
export class AppModule {}
