import bcrypt from 'bcryptjs';

import { ERROR } from '../../../common/consts';

import { getUserByEmail } from '../userUtils';
import { generateToken } from '../../../auth/auth';

const userLogin = async ctx => {
  const { email, password } = ctx.request.body;

  const user = getUserByEmail(email);

  if (!user) {
    ctx.status = 400;
    ctx.body = {
      status: ERROR,
      message: 'Email or password incorrect',
      user: null,
    };
    return;
  }

  if (await bcrypt.compare(ctx.request.body.password, password)) {
    ctx.status = 200;
    ctx.body = {
      message: 'Login successful',
      token: generateToken(user),
    };
    return;
  }

  ctx.status = 400;
  ctx.body = {
    status: ERROR,
    token: null,
    message: 'Email or password incorrect',
  };
  return;
};

export default userLogin;
