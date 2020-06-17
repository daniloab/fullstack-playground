import { clearDbAndRestartCounters, connectMongoose, disconnectMongoose } from '../../test';
import { createGetApiCall } from '../../test/helper';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

const url = '/api/version';

it('should get api version correctly', async () => {
  const payload = {};

  const response = await createGetApiCall({ url, payload });

  expect(response.body).toMatchSnapshot();
  expect(response.status).toBe(200);
});
