import { clearDbAndRestartCounters, connectMongoose, disconnectMongoose } from '@fullstack-playground/test';
import { createTenant, createUser } from '@fullstack-playground/modules';

import { createApiCall } from '../../../../../../test';
import { MESSAGE } from '../../../../ApiHelpers';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

const url = '/api/auth/v1/login/email';

it('should return error if domain not found', async () => {
  const payload = {
    email: 'test@test.com',
  };

  const response = await createApiCall({ url, payload, domainname: 'test' });

  expect(response.body).toMatchSnapshot();
  expect(response.body.message).toBe(MESSAGE.TENANT.NOT_FOUND);
  expect(response.status).toBe(401);
});

it('should return error if tenant is inactivated', async () => {
  const payload = {
    email: 'test@test.com',
  };

  const response = await createApiCall({ url, payload, domainname: 'test' });

  expect(response.body).toMatchSnapshot();
  expect(response.body.message).toBe(MESSAGE.TENANT.NOT_FOUND);
  expect(response.status).toBe(401);
});

it('should return error if user not found', async () => {
  const tenant = await createTenant();
  const payload = {
    email: 'test@test.com',
  };

  const response = await createApiCall({ url, payload, domainname: tenant.domainName });

  expect(response.body).toMatchSnapshot();
  expect(response.body.message).toBe(MESSAGE.LOGIN.INCORRECT);
  expect(response.status).toBe(400);
});

it('should return success if user found', async () => {
  const tenant = await createTenant();
  const user = await createUser({ email: 'user@test.com', tenant });

  const payload = {
    email: user.email,
  };

  const response = await createApiCall({ url, payload, domainname: tenant.domainName });

  const { companyId, ...restBody } = response.body;

  expect(restBody).toMatchSnapshot();
  expect(response.body.message).toBe(MESSAGE.LOGIN.EMAIL_SUCCESS);
  expect(response.status).toBe(200);
});
