import { clearDbAndRestartCounters, connectMongoose, disconnectMongoose } from '@fp/test';
import { createTenant, createUser } from '@fp/modules';

import { createApiCall } from '../../../../../../test';
import { MESSAGE } from '../../../../ApiHelpers';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

const url = '/api/auth/v1/login/password';

it('should return error if tenant id is different of tenant already checked by auth', async () => {
  const tenant = await createTenant();
  const payload = {
    email: 'test@test.com',
    password: '123456',
    tenantId: 'tenantWrongId',
  };

  const response = await createApiCall({
    url,
    payload,
    domainname: tenant.domainName,
  });

  expect(response.body).toMatchSnapshot();
  expect(response.body.message).toBe(MESSAGE.LOGIN.INVALID_TENANT);
  expect(response.status).toBe(401);
});

it('should return error if any payload field is missing (email)', async () => {
  const tenant = await createTenant();
  const payload = {
    password: '123456',
    tenantId: tenant._id,
  };

  const response = await createApiCall({
    url,
    payload,
    domainname: tenant.domainName,
  });

  expect(response.body).toMatchSnapshot();
  expect(response.body.message).toBe(MESSAGE.LOGIN.INVALID_LOGIN);
  expect(response.status).toBe(401);
});

it('should return error if user dont exist', async () => {
  const tenant = await createTenant();
  const payload = {
    email: 'userdontexist@test.com',
    password: '123456',
    tenantId: tenant._id,
  };

  const response = await createApiCall({
    url,
    payload,
    domainname: tenant.domainName,
  });

  expect(response.body).toMatchSnapshot();
  expect(response.body.message).toBe(MESSAGE.LOGIN.INCORRECT);
  expect(response.status).toBe(401);
});

it('should return error if user password is wrong', async () => {
  const tenant = await createTenant();
  const user = await createUser({ email: 'test@test.com', password: '123456' });

  const payload = {
    email: user.email,
    password: '654321',
    tenantId: tenant._id,
  };

  const response = await createApiCall({
    url,
    payload,
    domainname: tenant.domainName,
  });

  expect(response.body).toMatchSnapshot();
  expect(response.body.message).toBe(MESSAGE.LOGIN.INCORRECT);
  expect(response.status).toBe(401);
});

it('should made login with infos correct', async () => {
  const tenant = await createTenant();
  const user = await createUser({ email: 'test@test.com', password: '123456' });

  const payload = {
    email: user.email,
    password: '123456',
    tenantId: tenant._id,
  };

  const response = await createApiCall({
    url,
    payload,
    domainname: tenant.domainName,
  });

  expect(response.body).toMatchSnapshot();
  expect(response.body.message).toBe(MESSAGE.LOGIN.SUCCESS);
  expect(response.status).toBe(200);
});
