import { User } from '../../models';

export const getUserByEmail = async (email: string) => {
  if (!email) {
    return false;
  }

  const user = await User.findOne({
    email: email.trim().toLowerCase(),
  });

  return user;
};

export const getUserById = async (id: string) => {
  if (!id) {
    return false;
  }

  const user = await User.findOne({
    _id: id,
  });

  return user;
};
