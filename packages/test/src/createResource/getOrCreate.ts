import { Model } from 'mongoose';

export const getOrCreate = async (model: Model<any>, createFn: () => any) => {
  const data = await model.findOne().lean();

  if (data) {
    return data;
  }

  return createFn();
};
