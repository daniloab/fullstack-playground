import { Model, Types } from 'mongoose';
import { Context } from 'koa';

export const MESSAGE = {
  AUTH: {
    UNAUTHORIZED: 'Unauthorized',
  },
  COMMON: {
    INVALID_ID: 'Invalid id',
    EMAIL: 'email is a required field',
    EMAIL_INVALID: 'email must be a valid email',
    YUP_VALIDATION: 'Unknown error processing object',
  },
  LOGIN: {
    EMAIL_SUCCESS: 'Email successful',
    INCORRECT: 'Email or password incorrect',
    INVALID_LOGIN: 'Invalid login',
    INVALID_TENANT: 'Invalid tenant',
    SUCCESS: 'Login successful',
  },
  PAGE_INFO: {
    ERRORS: {
      NEGATIVE: 'Pagination values should be positive values',
    },
  },
  TENANT: {
    NOT_FOUND: 'Tenant not found',
  },
  USER: {
    CREATING: 'Some error occurred while creating user',
    MISSING: 'Missing user',
    NOT_FOUND: 'User not found',
    PASSWORD: 'You must informa a password',
    PRIMARY_KEY: 'User should have one of primary keys: id, or email',
    UPDATING: 'Some error occurred while updating user',
  },
};

export const getSkipAndLimit = (ctx: Context) => {
  const { skip = 0, limit = 100 } = ctx.query;

  if (skip < 0 || limit < 0) {
    return {
      skip: null,
      limit: null,
      errors: [{ data: { skip, limit }, message: MESSAGE.PAGE_INFO.ERRORS.NEGATIVE }],
    };
  }

  const mongoLimit = Math.min(parseInt(limit, 10), 100);
  const mongoSkip = parseInt(skip, 10);

  return {
    skip: mongoSkip,
    limit: mongoLimit,
    errors: null,
  };
};

type ErrorValidate = {
  data: {};
  message: string;
};

type PageInfo = {
  errors?: ErrorValidate[];
  skip: number;
  limit: number;
  totalCount: number;
  hasPreviousPage: number;
  hasNextPage: number;
};

export const getPageInfo = async (ctx: Context, model: Model): PageInfo => {
  const { company } = ctx;
  const { skip, limit, errors } = getSkipAndLimit(ctx);

  if (errors) {
    return {
      errors,
      skip,
      limit,
      totalCount: null,
      hasPreviousPage: null,
      hasNextPage: null,
    };
  }

  const conditionsTotalCount = {
    company,
    removedAt: null,
  };

  const totalCount = await model.count(conditionsTotalCount);

  const hasPreviousPage = skip > 0;
  const hasNextPage = skip + limit < totalCount;

  return {
    skip,
    limit,
    totalCount,
    hasPreviousPage,
    hasNextPage,
  };
};

export const checkObjectId = id => {
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
