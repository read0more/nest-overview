import { Controller, Get, HostParam } from '@nestjs/common';

@Controller({ host: ':account.admin.localhost' })
export class AdminController {
  @Get()
  getInfo(@HostParam('account') account: string) {
    console.log(account);
    return account;
  }
}
