import { RolesGuard } from './guards/roles.guard';
import { CatsModule } from './../cats/cats.module';
import { AdminController } from './admin.controller';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [AdminModule, CatsModule],
  exports: [CatsModule], // 모듈 다시 내보내기
  controllers: [AdminController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AdminModule {}
