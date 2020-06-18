import jwt from 'jsonwebtoken';

import { ERROR } from '../common/consts';

import { IUser } from '../models';
import { config } from '../config';

import { getUserById } from '../api/user/userUtils';

import getToken from './getToken';

export type AuthContext = {
  user: IUser;
};

// eslint-disable-next-line
const auth = async (ctx, next) => {
  const { authorization } = ctx;

  if (!authorization) {
    ctx.status = 401;
    ctx.body = {
      status: ERROR,
      message: 'Missing Authorization Token',
    };

    return;
  }

  const result = getToken(authorization);

  if (result == null) {
    ctx.status = 401;
    ctx.body = {
      status: ERROR,
      message: 'Invalid Token',
    };

    return;
  }

  const { userId } = result;
  const user = await getUserById(userId);

  // UnAuthorized
  if (user == null) {
    ctx.status = 401;
    ctx.body = {
      status: ERROR,
      message: 'Unauthorized',
    };

    return;
  }

  ctx.user = user;
  await next();
};

export default auth;

export const generateToken = (user: IUser) => {
  return `JWT ${jwt.sign({ id: user._id, email: user.email }, config.JWT_SECRET)}`;
};
