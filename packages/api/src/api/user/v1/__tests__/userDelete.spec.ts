import { Types } from 'mongoose';

import { createTenant, createUser } from '@fp/modules';

import { clearDbAndRestartCounters, connectMongoose, disconnectMongoose } from '@fp/test';

import { base64 } from '../../../../auth/base64';
import { MESSAGE } from '../../../ApiHelpers';
import { createDeleteApiCall } from '../../../../../test';

beforeAll(connectMongoose);

beforeEach(async () => {
  await clearDbAndRestartCounters();
  await jest.clearAllMocks();
});

afterAll(disconnectMongoose);

const url = '/api/user/v1/users';

it('should return id from user deleted', async () => {
  const tenant = await createTenant();
  const user = await createUser({ tenant });

  const authorization = base64(`${tenant._id}:${user._id}`);

  const userToDelete = await createUser({ tenant });

  const response = await createDeleteApiCall({
    url: `${url}/${userToDelete._id}`,
    authorization,
    domainname: tenant.domainName,
  });

  // expect(sanitizeTestObject(response.body)).toMatchSnapshot();
  expect(response.status).toBe(200);
  expect(response.body.user.toString()).toBe(userToDelete._id.toString());
});

it('should return error for id fake', async () => {
  const tenant = await createTenant();
  const user = await createUser({ tenant });
  const authorization = base64(`${tenant._id}:${user._id}`);

  const userToDelete = {
    _id: 'fake_id',
  };

  const response = await createDeleteApiCall({
    url: `${url}/${userToDelete._id}`,
    authorization,
    domainname: tenant.domainName,
  });

  // expect(sanitizeTestObject(response.body)).toMatchSnapshot();
  expect(response.status).toBe(400);
  expect(response.body.error.message).toBe(MESSAGE.COMMON.INVALID_ID);
});

it('should return error for id inexistent', async () => {
  const tenant = await createTenant();
  const user = await createUser({ tenant });
  const authorization = base64(`${tenant._id}:${user._id}`);

  const userToDelete = {
    _id: new Types.ObjectId(),
  };

  const response = await createDeleteApiCall({
    url: `${url}/${userToDelete._id}`,
    authorization,
    domainname: tenant.domainName,
  });

  // expect(sanitizeTestObject(response.body)).toMatchSnapshot();
  expect(response.status).toBe(400);
  expect(response.body.error.message).toBe(MESSAGE.USER.NOT_FOUND);
});

it('should return error as user not found when try delete an user already deleted', async () => {
  const tenant = await createTenant();
  const user = await createUser({ tenant });
  const authorization = base64(`${tenant._id}:${user._id}`);

  const userToDelete = await createUser({ tenant, removedAt: new Date() });

  const response = await createDeleteApiCall({
    url: `${url}/${userToDelete._id}`,
    authorization,
    domainname: tenant.domainName,
  });

  // expect(sanitizeTestObject(response.body)).toMatchSnapshot();
  expect(response.status).toBe(400);
  expect(response.body.error.message).toBe(MESSAGE.USER.NOT_FOUND);
});
