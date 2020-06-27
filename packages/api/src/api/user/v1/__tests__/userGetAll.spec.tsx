import { clearDbAndRestartCounters, connectMongoose, disconnectMongoose } from '@fullstack-playground/test';
import { createUser, createTenant } from '@fullstack-playground/modules';

import { base64 } from '../../../../auth/base64';
import { createGetApiCall } from '../../../../../test';

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
