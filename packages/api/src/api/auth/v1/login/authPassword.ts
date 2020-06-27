import { UserModel } from '@fullstack-playground/modules';

import { ERROR } from '../../../../common/consts';
import { generateToken } from '../../../../auth/auth';
import { MESSAGE } from '../../../ApiHelpers';

const authPassword = async ctx => {
  const { tenant } = ctx;
  const { email, password, tenantId } = ctx.request.body;

  if (tenant._id.toString().trim() !== tenantId.toString().trim()) {
    ctx.status = 400;
    ctx.body = {
      status: ERROR,
      message: MESSAGE.LOGIN.INVALID_TENANT,
      user: null,
    };
    return;
  }

  if (!email || !password || !tenantId) {
    ctx.status = 400;
    ctx.body = {
      status: ERROR,
      message: MESSAGE.LOGIN.INVALID_LOGIN,
      user: null,
    };
    return;
  }

  const user = await UserModel.findOne({
    email,
    tenant,
  });

  if (!user) {
    ctx.status = 400;
    ctx.body = {
      status: ERROR,
      message: MESSAGE.LOGIN.INCORRECT,
      user: null,
    };
    return;
  }

  let correctPassword = null;
  try {
    correctPassword = await user.authenticate(password);
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: ERROR,
      message: MESSAGE.LOGIN.INCORRECT,
      user: null,
    };
    return;
  }

  if (!correctPassword) {
    ctx.status = 400;
    ctx.body = {
      status: ERROR,
      message: MESSAGE.LOGIN.INCORRECT,
      user: null,
    };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    message: MESSAGE.LOGIN.SUCCESS,
    token: generateToken(tenant, user),
  };
  return;
};

export default authPassword;
