import { ITenant, TenantModel } from '@fullstack-playground/modules';

import { DeepPartial } from '@fullstack-playground/api/src/types';

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
