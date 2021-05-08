import { ITenant, TenantModel } from '@fp/modules';

import { DeepPartial } from '@fp/api/src/types';

export const createTenant = async (args: DeepPartial<ITenant> = {}) => {
  const { name, domainName } = args;
  const n = (global.__COUNTERS__.company += 1);

  const company = await new TenantModel({
    name: name ?? `Awesome Tenant ${n}`,
    domainName: domainName ?? 'test.application.com',
    active: true,
  }).save();

  return company;
};
