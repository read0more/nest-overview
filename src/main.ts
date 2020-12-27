import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(글로벌 미들웨어);
  await app.listen(3000);
}
bootstrap();
