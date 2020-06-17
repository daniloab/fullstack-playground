import { clearDbAndRestartCounters, connectMongoose, disconnectMongoose } from '../../../../../test';

import { createApiCall } from '../../../../../test/helper';
import { createUser } from '../../../../../test/createResource';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

const url = '/api/user/v1/signup';

it('should sign up a new user', async () => {
  const payload = {
    name: 'Joana User',
    password: '123456',
    email: 'test@test.com',
  };

  const response = await createApiCall({ url, payload });

  expect(response.body).toMatchSnapshot();
  expect(response.status).toBe(200);
});

it('should not sign up a user already registered', async () => {
  await createUser({ email: 'test@test.com' });

  const payload = {
    name: 'Joana User',
    password: '123456',
    email: 'test@test.com',
  };

  const response = await createApiCall({ url, payload });

  expect(response.body).toMatchSnapshot();
  expect(response.status).toBe(400);
});
