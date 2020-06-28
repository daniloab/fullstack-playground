import { clearDbAndRestartCounters, connectMongoose, disconnectMongoose } from '@fullstack-playground/test';
import { createUser, createTenant } from '@fullstack-playground/modules';

import { base64 } from '../../../../auth/base64';
import { createGetApiCall } from '../../../../../test';
import { MESSAGE } from '../../../ApiHelpers';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

const url = '/api/user/v1/users';

it('should return a list of users', async () => {
  const tenant = await createTenant();
  const user = await createUser({ tenant });

  const authorization = base64(`${tenant._id}:${user._id}`);

  const response = await createGetApiCall({
    url,
    authorization,
    domainname: tenant.domainName,
  });

  expect(response.status).toBe(200);
  expect(response.body.users.length).toBe(1);
});

it('should return 100 users if no skip limit is not specific', async () => {
  const tenant = await createTenant();
  const user = await createUser({ tenant, name: 'user#1' });

  const authorization = base64(`${tenant._id}:${user._id}`);

  for (const i of Array.from(Array(110).keys())) {
    await createUser({ tenant, name: `user#${i + 2}` });
  }

  const response = await createGetApiCall({
    url,
    authorization,
    domainname: tenant.domainName,
  });

  expect(response.status).toBe(200);
  expect(response.body.users.length).toBe(100);
});

it('should paginate with skip and limit 100 users if no skip limit is not specific', async () => {
  const tenant = await createTenant();
  const user = await createUser({ tenant, name: 'user#1' });
  const authorization = base64(`${tenant._id}:${user._id}`);

  for (const i of Array.from(Array(109).keys())) {
    await createUser({ tenant, name: `user#${i + 2}` });
  }

  const response = await createGetApiCall({
    url: `${url}?skip=90&limit=10`,
    authorization,
    domainname: tenant.domainName,
  });

  expect(response.status).toBe(200);
  expect(response.body.users.length).toBe(10);

  const u = response.body.users[0];

  expect(u.name).toBe('user#91');
});

it('should paginate with skip and limit 10 users, and do again the call to api and paginate to 20', async () => {
  const tenant = await createTenant();
  const user = await createUser({ tenant, name: 'user#1' });
  const authorization = base64(`${tenant._id}:${user._id}`);

  for (const i of Array.from(Array(15).keys())) {
    await createUser({ tenant, name: `user#${i + 2}` });
  }

  const response = await createGetApiCall({
    url: `${url}?skip=0&limit=10`,
    authorization,
    domainname: tenant.domainName,
  });

  expect(response.status).toBe(200);
  expect(response.body.users.length).toBe(10);

  const u = response.body.users[0];

  expect(u.name).toBe('user#1');

  const responseB = await createGetApiCall({
    url: `${url}?skip=10&limit=10`,
    authorization,
    domainname: tenant.domainName,
  });

  const userB = responseB.body.users[0];

  expect(userB.name).toBe('user#11');
  expect(responseB.body.pageInfo.hasNextPage).toBeFalsy();
});

it('should not accept skip negative', async () => {
  const tenant = await createTenant();
  const user = await createUser({ tenant, name: 'user#1' });
  const authorization = base64(`${tenant._id}:${user._id}`);

  for (const i of Array.from(Array(5).keys())) {
    await createUser({ tenant, name: `user#${i + 2}` });
  }

  const response = await createGetApiCall({
    url: `${url}?skip=${-10}&limit=10`,
    authorization,
    domainname: tenant.domainName,
  });

  expect(response.status).toBe(422);
  expect(response.body.errors.length).toBe(1);
  expect(response.body.errors[0].message).toBe(MESSAGE.PAGE_INFO.ERRORS.NEGATIVE);
  // expect(sanitizeTestObject(response.body)).toMatchSnapshot();
});

it('should not accept limit negative', async () => {
  const tenant = await createTenant();
  const user = await createUser({ tenant, name: 'user#1' });
  const authorization = base64(`${tenant._id}:${user._id}`);

  for (const i of Array.from(Array(5).keys())) {
    await createUser({ tenant, name: `user#${i + 2}` });
  }

  const response = await createGetApiCall({
    url: `${url}?skip=10&limit=${-10}`,
    authorization,
    domainname: tenant.domainName,
  });

  expect(response.status).toBe(422);
  expect(response.body.errors.length).toBe(1);
  expect(response.body.errors[0].message).toBe(MESSAGE.PAGE_INFO.ERRORS.NEGATIVE);
  // expect(sanitizeTestObject(response.body)).toMatchSnapshot();
});

it('should not accept skip and limit negative', async () => {
  const tenant = await createTenant();
  const user = await createUser({ tenant, name: 'user#1' });
  const authorization = base64(`${tenant._id}:${user._id}`);

  for (const i of Array.from(Array(5).keys())) {
    await createUser({ tenant, name: `user#${i + 2}` });
  }

  const response = await createGetApiCall({
    url: `${url}?skip=${-10}&limit=${-10}`,
    authorization,
    domainname: tenant.domainName,
  });

  expect(response.status).toBe(422);
  expect(response.body.errors.length).toBe(1);
  expect(response.body.errors[0].message).toBe(MESSAGE.PAGE_INFO.ERRORS.NEGATIVE);
  // expect(sanitizeTestObject(response.body)).toMatchSnapshot();
});
