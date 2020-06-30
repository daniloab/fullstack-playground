import { createTenant, createUser } from '@fullstack-playground/modules';

import { clearDbAndRestartCounters, connectMongoose, disconnectMongoose } from '@fullstack-playground/test';

import { base64 } from '../../../../auth/base64';
import { createApiCall } from '../../../../../test';

import { MESSAGE } from '../../../ApiHelpers';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

const url = '/api/user/v1/users';

it('should return error if user was not passed', async () => {
  const tenant = await createTenant();
  const user = await createUser({ tenant });
  const authorization = base64(`${tenant._id}:${user._id}`);

  const payload = {};

  const response = await createApiCall({ url, authorization, payload, domainname: tenant.domainName });

  expect(response.status).toBe(400);
  expect(response.body.message).toBe(MESSAGE.USER.MISSING);
});

it('should return error if email was not passed', async () => {
  const tenant = await createTenant();
  const user = await createUser({ tenant });
  const authorization = base64(`${tenant._id}:${user._id}`);

  const payload = {
    user: {
      name: 'User A',
    },
  };

  const response = await createApiCall({ url, authorization, payload, domainname: tenant.domainName });

  expect(response.status).toBe(400);
  expect(response.body.message).toBe(MESSAGE.COMMON.EMAIL);
});

it('should return error if email is not valid', async () => {
  const tenant = await createTenant();
  const user = await createUser({ tenant });
  const authorization = base64(`${tenant._id}:${user._id}`);

  const payload = {
    user: {
      name: 'User A',
      email: 'abvc',
    },
  };

  const response = await createApiCall({ url, authorization, payload, domainname: tenant.domainName });

  expect(response.status).toBe(400);
  expect(response.body.message).toBe(MESSAGE.COMMON.EMAIL_INVALID);
});

it('should return error if id passed is not object idvalid', async () => {
  const tenant = await createTenant();
  const user = await createUser({ tenant });
  const authorization = base64(`${tenant._id}:${user._id}`);

  const payload = {
    user: {
      id: '123',
      name: 'User A',
      email: 'test@test.com',
    },
  };

  const response = await createApiCall({ url, authorization, payload, domainname: tenant.domainName });

  expect(response.status).toBe(400);
  expect(response.body.message).toBe(MESSAGE.COMMON.INVALID_ID);
});

it('should return error if id passed not found', async () => {
  const tenant = await createTenant();
  const user = await createUser({ tenant });
  const authorization = base64(`${tenant._id}:${user._id}`);

  const payload = {
    user: {
      id: '5ef4f0c34ed6710503da88b6',
      name: 'User A',
      email: 'test@test.com',
    },
  };

  const response = await createApiCall({ url, authorization, payload, domainname: tenant.domainName });

  expect(response.status).toBe(400);
  expect(response.body.message).toBe(MESSAGE.USER.NOT_FOUND);
});

it('should return error for new user without pw', async () => {
  const tenant = await createTenant();
  const user = await createUser({ tenant });
  const authorization = base64(`${tenant._id}:${user._id}`);

  const payload = {
    user: {
      name: 'Awesome Name',
      email: `email@domain.tld`,
    },
  };

  const response = await createApiCall({ url, authorization, payload, domainname: tenant.domainName });

  expect(response.status).toBe(400);
  expect(response.body.message).toBe(MESSAGE.USER.PASSWORD);
});

it('should return OK for new user', async () => {
  const tenant = await createTenant();
  const user = await createUser({ tenant });
  const authorization = base64(`${tenant._id}:${user._id}`);

  const payload = {
    user: {
      name: 'Awesome Name',
      email: `email@domain.tld`,
      password: '123456',
    },
  };

  const response = await createApiCall({ url, authorization, payload, domainname: tenant.domainName });

  expect(response.status).toBe(200);
  expect(response.body.message).toBe('User successfully created');
});

it('should return ok for user updated', async () => {
  const tenant = await createTenant();
  const user = await createUser({ tenant });
  const userToUpdated = await createUser({ tenant });
  const authorization = base64(`${tenant._id}:${user._id}`);

  const payload = {
    user: {
      id: userToUpdated._id,
      name: 'Awesome Name Updated',
      email: userToUpdated.email,
    },
  };

  const response = await createApiCall({ url, authorization, payload, domainname: tenant.domainName });

  expect(response.body.message).toBe('User successfully updated');
  expect(response.status).toBe(200);
});
