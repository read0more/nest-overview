import { ConfigService } from './../config/config.service';
import { LoggingInterceptor } from './../common/intercepters/logging.interceptor';
import { GlobalService } from './../global/global.service';
import { CatsService } from './../cats/cats.service';
import {
  Controller,
  Get,
  HostParam,
  Inject,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ModuleRef } from '@nestjs/core';

@UseInterceptors(LoggingInterceptor)
@Controller({ host: ':account.admin.localhost' })
export class AdminController {
  constructor(
    @Inject('VALUE') private value: string,
    @Inject('ASYNC') private async: string,
    private catsService: CatsService,
    private globalService: GlobalService,
    private configService: ConfigService,
    private moduleRef: ModuleRef,
  ) {}

  @Get()
  @Roles('admin')
  getInfo(@HostParam('account') account: string) {
    this.catsService.testPrint(); // 공유모듈 테스트
    this.globalService.testPrint(); // 헬퍼나 DB커넥션 관련에서 쓸것으로 예상되는 글로벌모듈 테스트. 글로벌이므로 admin모듈에 import를 하지 않아도 주입이 되었다.
    console.log(account, this.async);
    console.log(this.configService.get('key2'));
    return `${account} ${this.value}`;
  }

  @Get('/print')
  print() {
    console.log(this.moduleRef.get('ConfigService', { strict: false }));
    return '콘솔로그에 찍었음';
  }
}
