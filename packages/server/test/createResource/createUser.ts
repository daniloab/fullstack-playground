import { IUser, User } from '../../src/models';

import { DeepPartial } from '../../src/types';

type CreateUserArgs = DeepPartial<IUser>;
export const createUser = async (args: CreateUserArgs = {}): Promise<IUser> => {
  let { email } = args;

  // TODO - migrate to getCounter
  // const n = getCounter('user');
  const n = (global.__COUNTERS__.user += 1);

  if (!email) {
    email = `user${n}@example.com`;
  }

  return new User({
    name: `Normal user ${n}`,
    password: '123456',
    email,
  }).save();
};
