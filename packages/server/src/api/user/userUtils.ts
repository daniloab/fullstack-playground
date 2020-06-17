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
