import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(글로벌 미들웨어);
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter)); 이거 대신 app.module의 APP_FILTER 토큰 사용하여 전역 처리
  await app.listen(3000);
}
bootstrap();
