import { UserModel } from '@fp/modules';

import { getPageInfo, getSkipAndLimit } from '../../ApiHelpers';
import { AuthContext } from '../../../auth/auth';
import { ERROR, OK } from '../../../common/consts';

import { userSelection } from './userGet';

const userGetAll = async (ctx: AuthContext) => {
  const { tenant } = ctx;

  const { skip, limit } = getSkipAndLimit(ctx);

  const conditions = {
    tenant,
    removedAt: null,
  };

  try {
    const users = await UserModel.find(conditions)
      .select(userSelection)
      .skip(skip)
      .limit(limit)
      .lean();

    // check why we use map user api, I guess that is to output
    // const mappedUsers = users.map((user: IUser) => mapUserApi(user));
    const pageInfo = await getPageInfo(ctx, UserModel);

    if (pageInfo.errors) {
      ctx.status = 422;
      ctx.body = {
        status: ERROR,
        errors: pageInfo.errors,
      };

      return;
    }

    ctx.status = 200;
    ctx.body = {
      pageInfo,
      status: OK,
      users: users,
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

export default userGetAll;
