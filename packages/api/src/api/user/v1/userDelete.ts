import { UserModel } from '@fullstack-playground/modules';

import { AuthContext } from '../../../auth/auth';
import { checkObjectId, MESSAGE } from '../../ApiHelpers';
import { ERROR, OK } from '../../../common/consts';

const validate = async (ctx: AuthContext, id: string) => {
  const { tenant } = ctx;

  const { error } = checkObjectId(id);

  if (error) {
    return {
      errorValidateUser: { data: id, message: MESSAGE.COMMON.INVALID_ID },
      validateUser: null,
    };
  }

  const userAlreadyDeleted = await UserModel.findOne({
    _id: id,
    tenant,
    removedAt: {
      $ne: null,
    },
  });

  if (userAlreadyDeleted) {
    return {
      errorValidateUser: { data: id, message: MESSAGE.USER.NOT_FOUND },
      validateUser: null,
    };
  }

  const user = await UserModel.findOne({
    _id: id,
    tenant,
    removedAt: null,
  });

  if (!user) {
    return {
      errorValidateUser: { data: id, message: MESSAGE.USER.NOT_FOUND },
      validateUser: null,
    };
  }

  return {
    errorValidateUser: null,
    validateUser: user,
  };
};

const deleteUser = async (ctx: AuthContext, id: string) => {
  const { tenant } = ctx;
  const { errorValidateUser, validateUser } = await validate(ctx, id);

  if (errorValidateUser) {
    return {
      error: errorValidateUser,
      user: null,
    };
  }

  await UserModel.updateOne(
    {
      _id: validateUser,
      tenant,
    },
    {
      $set: {
        removedAt: new Date(),
      },
    },
  );

  ctx.updated++;

  return {
    error: null,
    user: validateUser._id,
  };
};

const userDelete = async (ctx: AuthContext) => {
  const { id } = ctx.params;

  if (!id) {
    ctx.status = 400;
    ctx.body = {
      status: ERROR,
      error: MESSAGE.COMMON.INVALID_ID,
      user: null,
    };
    return;
  }

  try {
    const { error, user } = await deleteUser(ctx, id);

    if (error) {
      ctx.status = 400;
      ctx.body = {
        status: ERROR,
        error,
        user: null,
      };

      return;
    }

    ctx.status = 200;
    ctx.body = {
      status: OK,
      user,
    };

    return;
  } catch (err) {
    // eslint-disable-next-line
    console.log('err:', err);

    ctx.status = 500;
    ctx.body = {
      status: ERROR,
      error: err,
    };
  }
};

export default userDelete;
