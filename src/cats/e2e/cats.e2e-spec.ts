import { CatsModule } from './../cats.module';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';

import { INestApplication } from '@nestjs/common';

describe('Cats', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CatsModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET /cats/print`, () => {
    const string = 'test';
    return request(app.getHttpServer())
      .get(`/cats/print?string=${string}`)
      .expect(200)
      .expect({
        data: string,
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
