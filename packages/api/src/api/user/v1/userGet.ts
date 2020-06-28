import { UserModel } from '@fullstack-playground/modules';

import { Types } from 'mongoose';

import { AuthContext } from '../../../auth/auth';
import { ERROR, OK } from '../../../common/consts';
import { MESSAGE } from '../../ApiHelpers';

export const userSelection = {
  _id: 1,
  name: 1,
};

export const conditionId = id => {
  if (!Types.ObjectId.isValid(id)) {
    return {
      error: true,
    };
  }

  return {
    error: false,
    _id: id,
  };
};

export const getUserApi = async (conditions: object) => {
  const user = await UserModel.findOne(conditions)
    .select(userSelection)
    .lean();

  return user;
};

const userGet = async (ctx: AuthContext) => {
  const { tenant } = ctx;
  const { id } = ctx.params;

  try {
    const { error, ...validatedId } = conditionId(id);
    if (error) {
      ctx.status = 400;
      ctx.body = {
        status: ERROR,
        message: MESSAGE.USER.NOT_FOUND,
        user: null,
      };
      return;
    }

    const conditions = {
      ...validatedId,
      tenant,
      removedAt: null,
    };

    const user = await getUserApi(conditions);

    if (!user) {
      ctx.status = 400;
      ctx.body = {
        status: ERROR,
        message: MESSAGE.USER.NOT_FOUND,
        user: null,
      };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      status: OK,
      user: user,
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

export default userGet;
