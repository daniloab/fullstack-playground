import { TenantModel, UserModel } from '@fullstack-playground/modules';

import { ERROR } from '../common/consts';

import { MESSAGE } from '../api/ApiHelpers';

import getToken from './getToken';

export const getUser = async (token?: string, domainName?: string) => {
  const tenant = domainName
    ? await TenantModel.findOne({
        domainName: domainName,
      })
    : null;

  const defaultReturn = {
    user: null,
    tenant,
    unauthorized: false,
  };

  const defaultInvalidToken = {
    user: null,
    tenant,
    unauthorized: true,
  };

  if (!tenant) {
    return {
      ...defaultInvalidToken,
      company: null,
      message: MESSAGE.TENANT.NOT_FOUND,
    };
  }

  if (tenant && tenant.active === false) {
    return {
      ...defaultInvalidToken,
      company: null,
      message: MESSAGE.TENANT.NOT_FOUND,
    };
  }

  if (!token || token === 'null') {
    return defaultReturn;
  }

  try {
    const { tenant, user: userId } = getToken(token);

    const user = await UserModel.findOne({
      _id: userId,
      tenant,
    });

    // UnAuthorized
    if (user == null) {
      ctx.status = 401;
      ctx.body = {
        status: ERROR,
        message: MESSAGE.AUTH.UNAUTHORIZED,
      };

      return;
    }

    return {
      user,
      tenant,
    };
  } catch (err) {
    // eslint-disable-next-line
    console.lg('err: ', err);
  }
};
