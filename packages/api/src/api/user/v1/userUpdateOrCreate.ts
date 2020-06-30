import { Context } from 'koa';

import { getUserApi } from './userGet';
import { ApiUser, getExistingUser, handleCreateNewUser, handleUpdateUser, validateUserDataFromApi } from './userUtils';

export const userUpdateOrCreate = async (ctx: Context, apiUser: ApiUser) => {
  const { error, user } = await validateUserDataFromApi(apiUser);

  if (error != null) {
    return {
      error,
    };
  }

  const hasExistingUser = await getExistingUser(ctx, user);

  if (hasExistingUser.error != null) {
    return {
      error: hasExistingUser.error,
    };
  }

  if (hasExistingUser.user) {
    const existingUser = hasExistingUser.user;
    const { userUpdatedByApi, errorUserUpdatedByApi } = await handleUpdateUser(ctx, user, existingUser);

    if (errorUserUpdatedByApi) {
      return {
        error: errorUserUpdatedByApi,
      };
    }

    ctx.updated++;

    const updatedUser = await getUserApi(userUpdatedByApi._id);

    return {
      error: errorUserUpdatedByApi,
      message: 'User successfully updated',
      user: updatedUser,
    };
  }

  const { newUser, errorNewUser } = await handleCreateNewUser(ctx, user);

  if (errorNewUser) {
    return {
      error: errorNewUser,
    };
  }

  const newUserApi = await getUserApi(newUser._id);

  return {
    error: null,
    message: 'User successfully created',
    user: newUserApi,
  };
};
