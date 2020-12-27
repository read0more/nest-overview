import { CatsModule } from './../cats/cats.module';
import { AdminController } from './admin.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [AdminModule, CatsModule],
  exports: [CatsModule], // 모듈 다시 내보내기
  controllers: [AdminController],
  providers: [],
})
export class AdminModule {}
