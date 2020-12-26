import {
  Controller,
  Get,
  Req,
  Headers,
  Post,
  Param,
  HttpCode,
  Header,
  Redirect,
  Query,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './create-cat.dto';
import { UpdateCatDto } from './update-cat.dto';

@Controller('cats')
export class CatsController {
  @Get()
  userAgent(@Headers('user-agent') userAgent: string): string {
    console.log(userAgent);

    return '콘솔로그에 userAgent';
  }

  @Get()
  notWorking(): string {
    return '위에 있는게 우선돼서 들어올 일이 없다';
  }

  @Get('a*z')
  wildCard() {
    return 'a로시작하고 z로 끝나면 여기. ?, +도 사용 가능';
  }

  @Post(':id')
  @Header('Cache-Control', 'none')
  @HttpCode(201)
  postTest(@Param() params): string {
    console.log(params.id);

    return '';
  }

  @Get('/redirect')
  @Redirect('https://google.com')
  redirect(@Query('site') site) {
    // object 리턴하면 Redirect 데코레이터 인수들 override
    if (site) {
      return {
        url: site,
        statusCode: 303,
      };
    }
  }

  @Get('/req')
  request(@Req() request: Request): Array<number> {
    console.log(request.url);

    return [1, 2, 3];
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto);
    return '새 고양이다';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `#${id} 고양이 정보가 갱신되었다.`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `#${id} 고양이 정보가 제거되었다`;
  }
}
