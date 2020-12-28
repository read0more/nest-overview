import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { CatsController } from './cats/cats.controller';
// import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { logger } from './common/middleware/logger.middleware';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { AdminModule } from './admin/admin.module';
import { GlobalModule } from './global/global.module';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [CatsModule, AdminModule, GlobalModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter, // 필터 글로벌하게 적용
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter, // 필터 글로벌하게 적용
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 여러개의 미들웨어를 넣을 때 예시
    // consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);

    consumer
      // .apply(LoggerMiddleware)
      .apply(logger)
      .exclude({ path: 'cats', method: RequestMethod.POST }, 'cats/(a.*z)')
      // forRoutes('cats');
      // .forRoutes({ path: 'cats', method: RequestMethod.GET });
      .forRoutes(CatsController);
  }
}
