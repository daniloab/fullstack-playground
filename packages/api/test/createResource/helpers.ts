import { Model } from 'mongoose';

// TODO - investigate this
// export const getOrCreate = async <T extends Document>(model: Model<T>, createFn: Function) => {
export const getOrCreate = async (model: Model<any>, createFn: Function) => {
  const data = await model.findOne().lean();

  if (data) {
    return data;
  }

  return createFn();
};

export const getCounter = (key: string) => {
  if (key in global.__COUNTERS__) {
    const currentValue = global.__COUNTERS__[key];

    global.__COUNTERS__[key]++;

    return currentValue;
  }

  global.__COUNTERS__[key] = 0;
  return 0;
};

export const restartCounters = () => {
  global.__COUNTERS__ = Object.keys(global.__COUNTERS__).reduce((prev, curr) => ({ ...prev, [curr]: 0 }), {});
};
