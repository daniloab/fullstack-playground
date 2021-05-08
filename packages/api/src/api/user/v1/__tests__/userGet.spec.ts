import { clearDbAndRestartCounters, connectMongoose, disconnectMongoose } from '@fp/test';
import { createUser, createTenant } from '@fp/modules';

import { base64 } from '../../../../auth/base64';
import { createGetApiCall } from '../../../../../test';

beforeAll(connectMongoose);

beforeEach(async () => {
  await clearDbAndRestartCounters();
  await jest.clearAllMocks();
});

afterAll(disconnectMongoose);

const getUrl = (id: string) => `/api/user/v1/users/${id}`;

it('should return 400 if id is invalid', async () => {
  const tenant = await createTenant();
  const user = await createUser({ tenant });

  const authorization = base64(`${tenant._id}:${user._id}`);

  const url = getUrl('1');

  const response = await createGetApiCall({
    url,
    authorization,
    domainname: tenant.domainName,
  });

  expect(response.status).toBe(400);
  expect(response.body.user).toBe(null);
  expect(response.body.message).toBe('User not found');

  // eslint-disable-next-line
  // expect(response.body).toMatchSnapshot();
});

it('should return user by object id', async () => {
  const tenant = await createTenant();
  const user = await createUser({ tenant });

  const authorization = base64(`${tenant._id}:${user._id}`);

  const url = getUrl(user._id.toString());

  const response = await createGetApiCall({
    url,
    authorization,
    domainname: tenant.domainName,
  });

  expect(response.status).toBe(200);
  expect(response.body.user).not.toBe(null);

  // eslint-disable-next-line
  // expect(sanitizeTestObject(response.body)).toMatchSnapshot();
});
