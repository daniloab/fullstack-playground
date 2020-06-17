import { User } from '../../../models';
import { ERROR } from '../../../common/consts';

const userSignUp = async ctx => {
  const { name, email, password } = ctx.request.body;

  const hasUser = (await User.countDocuments({ email: email.trim().toLowerCase() })) > 0;

  if (hasUser) {
    ctx.status = 400;
    ctx.body = {
      status: ERROR,
      message: 'User already registered',
      user: null,
    };
    return;
  }

  const user = await new User({
    name,
    email,
    password,
  }).save();

  if (!user) {
    ctx.status = 400;
    ctx.body = {
      status: ERROR,
      message: 'Error creating user',
      user: null,
    };
  }

  ctx.status = 200;
  ctx.body = {
    message: 'User successfully created',
  };

  return;
};

export default userSignUp;
