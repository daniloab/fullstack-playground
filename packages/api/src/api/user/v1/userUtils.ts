import { IUser, UserModel } from '@fullstack-playground/modules';
import { DeepPartial } from '@fullstack-playground/types';

import * as yup from 'yup';

import { Types } from 'mongoose';

import { getObjectId } from '@fullstack-playground/test';

import { MESSAGE } from '../../ApiHelpers';

export type ApiUser = {
  id?: string;
  name: string;
  email: string;
  password?: string;
};

type ErrorObj = {
  data: object;
  message: string;
};

type ValidateUserResult = {
  error: string[] | null | ErrorObj[];
  user: DeepPartial<IUser> | null;
};

yup.addMethod(yup.string, 'objectId', function() {
  return this.test('id', MESSAGE.COMMON.INVALID_ID, value => {
    if (!value) {
      return true;
    }

    const id = getObjectId(value);

    if (id instanceof Types.ObjectId) {
      return true;
    }

    return false;
  });
});

const userSchema = yup.object().shape({
  id: yup
    .string()
    .objectId()
    .nullable(),
  name: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().nullable(),
});

export const validateUserDataFromApi = async (apiUser: ApiUser): Promise<ValidateUserResult> => {
  try {
    await userSchema.validate(apiUser);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return {
        error: error.message,
        user: null,
      };
    }

    // fallback
    return {
      error: MESSAGE.COMMON.YUP_VALIDATION,
      user: null,
    };
  }

  return {
    error: null,
    user: apiUser,
  };
};

export const getExistingUser = async (ctx: Context, user: ApiUser) => {
  if (!user.email) {
    return {
      error: MESSAGE.USER.PRIMARY_KEY,
      user: null,
    };
  }

  const findUser = await UserModel.findOne({
    _id: user.id,
    email: user.email,
  });

  if (user.id && !findUser) {
    return {
      error: MESSAGE.USER.NOT_FOUND,
      user: null,
    };
  }

  return {
    error: null,
    user: findUser,
  };
};

export const handleUpdateUser = async (ctx: Context, user: ApiUser, existingUser: IUser) => {
  const userUpdatedByApi = await UserModel.findOneAndUpdate(
    {
      _id: existingUser._id,
    },
    {
      $set: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    },
  );

  if (!userUpdatedByApi) {
    return {
      errorUserUpdatedByApi: MESSAGE.USER.UPDATING,
      userUpdatedByApi: null,
    };
  }

  return { errorUserUpdatedByApi: null, userUpdatedByApi };
};

export const handleCreateNewUser = async (ctx: Context, user: ApiUser) => {
  const { tenant } = ctx;

  if (!user.password) {
    return {
      errorNewUser: MESSAGE.USER.PASSWORD,
      newUser: null,
    };
  }

  const newUser = new UserModel({
    tenant,
    name: user.name,
    email: user.email,
    password: user.password,
  });

  await newUser.save();

  if (!newUser) {
    return {
      errorNewUser: MESSAGE.USER.CREATING,
      newUser: null,
    };
  }

  return {
    errorsNewUser: null,
    newUser,
  };
};
