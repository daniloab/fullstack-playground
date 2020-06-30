import { AuthContext } from '../../../auth/auth';
import { ERROR, OK } from '../../../common/consts';

import { MESSAGE } from '../../ApiHelpers';

import { userUpdateOrCreate } from './userUpdateOrCreate';

export const userPost = async (ctx: AuthContext) => {
  const { user = null } = ctx.request.body;

  if (!user) {
    // eslint-disable-next-line
    console.log(MESSAGE.USER.MISSING);

    ctx.status = 400;
    ctx.body = {
      status: ERROR,
      message: MESSAGE.USER.MISSING,
    };

    return;
  }

  try {
    ctx.body = {
      errors: [],
      data: {},
    };

    const { error, message: messageApi, user: userApi } = await userUpdateOrCreate(ctx, user);

    if (error) {
      ctx.status = 400;
      ctx.body = {
        status: ERROR,
        message: error,
        user: user,
      };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      status: OK,
      message: messageApi,
      user: userApi,
    };

    return;
  } catch (err) {
    // eslint-disable-next-line
    console.log('err:', err);

    ctx.status = 500;
    ctx.body = {
      status: ERROR,
      message: err,
    };
  }
};
