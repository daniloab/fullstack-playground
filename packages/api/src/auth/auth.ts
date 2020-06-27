import jwt from 'jsonwebtoken';

import { IUser, ITenant } from '@fullstack-playground/modules';

import { ERROR } from '../common/consts';
import { config } from '../config';

import { getUser } from './sessionManagement';

export type AuthContext = {
  user: IUser;
  tenant: ITenant;
};

const auth = async (ctx, next) => {
  const { authorization, domainname } = ctx.header;

  const result = await getUser(authorization, domainname);

  const { unauthorized, user, tenant, message } = result;

  if (unauthorized) {
    ctx.status = 401;
    ctx.body = {
      status: ERROR,
      message,
    };

    return;
  }

  ctx.user = user;
  ctx.tenant = tenant;

  await next();
};

export default auth;

export const generateToken = (tenant: ITenant, user: IUser) => {
  return `JWT ${jwt.sign({ tenant: tenant._id, user: user._id }, config.JWT_SECRET)}`;
};
