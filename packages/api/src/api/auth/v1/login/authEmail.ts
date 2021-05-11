import { UserModel } from '@fp/modules';

import { ERROR } from '../../../../common/consts';
import { MESSAGE } from '../../../ApiHelpers';

const authEmail = async (ctx) => {
  const { tenant } = ctx;
  const { email } = ctx.request.body;

  const user = await UserModel.findOne({
    email,
    tenant,
  });

  if (!user) {
    ctx.status = 400;
    ctx.body = {
      status: ERROR,
      message: MESSAGE.LOGIN.INCORRECT,
    };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    companyId: user.tenant._id,
    message: MESSAGE.LOGIN.EMAIL_SUCCESS,
  };
  return;
};

export default authEmail;
