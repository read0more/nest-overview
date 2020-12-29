import { VALUE, ASYNC } from './constants';
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
    {
      provide: VALUE, // JS 심볼이나 TS의 enum도 사용가능
      useValue: '이건 값이다.',
    },
    {
      provide: ASYNC,
      useFactory: async () => {
        const test = await new Promise((resolve) => {
          setTimeout(() => {
            resolve('timeout 3초');
          }, 3000);
        });

        return test;
      },
    },
  ],
})
export class AdminModule {}
