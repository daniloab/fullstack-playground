import { clearDbAndRestartCounters, connectMongoose, disconnectMongoose } from '@fullstack-playground/test';

import { createGetApiOpenCall } from '../../test';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

const url = '/api/version';

it('should get api version correctly', async () => {
  const payload = {};

  const response = await createGetApiOpenCall({ url, payload });

  expect(response.body).toMatchSnapshot();
  expect(response.status).toBe(200);
});
