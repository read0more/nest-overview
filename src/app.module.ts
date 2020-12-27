import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { AdminModule } from './admin/admin.module';
import { GlobalModule } from './global/global.module';

@Module({
  imports: [CatsModule, AdminModule, GlobalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
