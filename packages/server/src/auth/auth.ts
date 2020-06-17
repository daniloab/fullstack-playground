import { ERROR } from '../common/consts';

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
