import { getOrCreate } from '@fullstack-playground/test';
import { DeepPartial } from '@fullstack-playground/types';

import UserModel, { IUser } from '../UserModel';
import TenantModel from '../../tenant/TenantModel';
import { createTenant } from '../../tenant/__fixtures__/createTenant';

type CreateUserArgs = DeepPartial<IUser>;
export const createUser = async (args: CreateUserArgs = {}): Promise<IUser> => {
  let { email, tenant } = args;

  // TODO - migrate to getCounter
  // const n = getCounter('user');
  const n = (global.__COUNTERS__.user += 1);

  if (!email) {
    email = `user${n}@example.com`;
  }

  if (!tenant) {
    tenant = await getOrCreate(TenantModel, createTenant);
  }

  return new UserModel({
    name: args.name || `Normal user ${n}`,
    password: '123456',
    email,
    tenant,
  }).save();
};
