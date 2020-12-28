import { ClassValidatorValidationPipe } from './pipes/class-validator-validation.pipe';
import { JoiValidationPipe } from './pipes/joi-validation.pipe';
import { HttpExceptionFilter } from './../common/filters/http-exception.filter';
import { ForbiddenException } from './../common/exception/ForbiddenException.exception';
import { CatsService } from './cats.service';
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
  HttpStatus,
  UseFilters,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  DefaultValuePipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import createCatSchema from './schemas/create-cat-schema';

@Controller('cats')
@UseFilters(HttpExceptionFilter) // 메서드 위에 데코레이터를 달면 스코프가 메서드로 바뀜
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  userAgent(@Headers('user-agent') userAgent: string): string {
    console.log(userAgent);

    return '콘솔로그에 userAgent';
  }

  @Get()
  notWorking(): string {
    return '위에 있는게 우선되므로 화면에 이 문장이 보일일은 없지만...이 path에 대해 apply한 미들웨어는 이 함수로 인해 두 번 동작한다.';
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

  @Get('/pipe')
  pipeTest(
    @Query(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe)
    activeOnly: boolean,
  ) {
    return id;
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

  @Get('/forbidden')
  forbidden(@Req() request: Request) {
    throw new ForbiddenException();
    // throw new HttpException('Forbidden....', HttpStatus.FORBIDDEN);
  }

  // create쪽은 Joi를 사용, update쪽에는 class-validator를 사용. nest와 합치기에는 class-validator가 더 좋다고 느낌
  @Post()
  @UsePipes(new JoiValidationPipe(createCatSchema))
  // @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createCatDto: CreateCatDto) {
    // this.catsService.create(createCatDto)
    console.log(createCatDto);
    return '새 고양이다';
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ClassValidatorValidationPipe()) updateCatDto: UpdateCatDto,
  ) {
    // this.catsService.update(updateCatDto)
    return `#${id} 고양이 정보가 갱신되었다.`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `#${id} 고양이 정보가 제거되었다`;
  }
}
