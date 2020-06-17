import jwt from 'jsonwebtoken';

import { ERROR } from '../common/consts';

import { IUser } from '../models';
import { config } from '../config';

import getToken from './getToken';

// eslint-disable-next-line
const auth = (ctx, next) => {
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
};

export default auth;

export const generateToken = (user: IUser) => {
  return `JWT ${jwt.sign({ id: user._id }, config.JWT_SECRET)}`;
};
