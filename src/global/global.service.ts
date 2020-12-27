import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalService {
  testPrint() {
    console.log('Global service test');
  }
}
