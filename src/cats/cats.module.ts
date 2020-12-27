import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [CatsModule],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {
  constructor(private catsService: CatsService) {
    // 예: 서비스에 대한 설정 필요가 있다면 이렇게 주입 가능
  }
}
