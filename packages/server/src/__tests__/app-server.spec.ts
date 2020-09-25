import request from 'supertest';

import { clearDbAndRestartCounters, connectMongoose, disconnectMongoose } from '@fullstack-playground/test';

import app from '../app';
import { version } from '../../package.json';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should return version', async () => {
  // language=GraphQL
  const query = `
    query Q {
      version     
    }
  `;

  const variables = {};

  const payload = {
    query,
    variables,
  };

  const response = await request(app.callback())
    .post('/graphql')
    .set({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })
    .send(JSON.stringify(payload));

  expect(response.body.errors).toBeUndefined();
  expect(response.body.data.version).toBe(version);
});
