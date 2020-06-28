import { clearDbAndRestartCounters, connectMongoose, disconnectMongoose } from '@fullstack-playground/test';
import { createUser, createTenant } from '@fullstack-playground/modules';

import { base64 } from '../../../../auth/base64';
import { createGetApiCall } from '../../../../../test';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it.skip('should return 400 if id is invalid', async () => {
  const tenant = await createTenant();
  const user = await createUser({ tenant });

  const authorization = base64(`${tenant._id}:${user._id}`);

  const url = '1';

  const response = await createGetApiCall({ url, authorization });

  expect(response.status).toBe(400);
  expect(response.body.user).toBe(null);
  expect(response.body.message).toBe('User not found');

  expect(response.body).toMatchSnapshot();
});
