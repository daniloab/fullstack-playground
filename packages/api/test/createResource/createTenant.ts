import { DeepPartial } from '../../src/types';
import { ITenant, Tenant } from '../../src/models';

export const createTenant = async (args: DeepPartial<ITenant> = {}) => {
  const { name, domainName } = args;
  const n = (global.__COUNTERS__.company += 1);

  const company = await new Tenant({
    name: name ?? `Awesome Tenant ${n}`,
    domainName: domainName ?? 'test.application.com',
    active: true,
  }).save();

  return company;
};
