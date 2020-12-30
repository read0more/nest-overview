import { Cat } from './interfaces/cat.interface';
import { CatsService } from './cats.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    // catsService = moduleRef.get<CatsService>(CatsService);
    catsService = await moduleRef.resolve(CatsService); // resolve를 사용해야 해야 동적으로 provider scope를 resolve해서 사용.
    // catsController = moduleRef.get<CatsController>(CatsController);
    catsController = await moduleRef.resolve(CatsController);
  });

  describe('userAgent', () => {
    it('테스트', async () => {
      const result: Cat[] = [
        {
          name: '1호',
          age: 2,
          breed: '메인쿤',
        },
        {
          name: '2호',
          age: 3,
          breed: '노르웨이 숲 고양이',
        },
      ];
      jest.spyOn(catsService, 'findAll').mockImplementation(() => result);
      expect(await catsController.findAll()).toBe(result);
    });
  });
});
