import { clearDbAndRestartCounters, connectMongoose, disconnectMongoose } from '../../../../../test';

import { createApiCall } from '../../../../../test/helper';
import { createUser } from '../../../../../test/createResource';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

const url = '/api/user/v1/login';

it('should not to do login if user not exists', async () => {
  const payload = {
    password: '123456',
    email: 'test@test.com',
  };

  const response = await createApiCall({ url, payload });

  expect(response.body).toMatchSnapshot();
  expect(response.body.message).toBe('Email or password incorrect');
  expect(response.status).toBe(400);
});

it('should not login if user exists but password is incorrect', async () => {
  await createUser({ email: 'test@test.com', password: '123456' });

  const payload = {
    password: 'abcdef',
    email: 'test@test.com',
  };

  const response = await createApiCall({ url, payload });

  expect(response.body).toMatchSnapshot();
  expect(response.body.message).toBe('Email or password incorrect');
  expect(response.status).toBe(400);
});

it('should made login if user exists and password is correct', async () => {
  await createUser({ email: 'test@test.com', password: '123456' });

  const payload = {
    password: '123456',
    email: 'test@test.com',
  };

  const response = await createApiCall({ url, payload });

  expect(response.body.message).toMatchSnapshot();
  expect(response.body.message).toBe('Login successful');
  expect(response.status).toBe(200);
});
