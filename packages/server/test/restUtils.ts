import request from 'supertest';

import app from '../src/app';

export const createApiCall = async (args = {}) => {
  const { url, authorization, payload: body } = args;

  const payload = {
    ...body,
  };

  const response = await request(app.callback())
    .post(url)
    .set({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(authorization ? { authorization } : {}),
    })
    .send(JSON.stringify(payload));

  return response;
};

export const createGetApiCall = async (args = {}) => {
  const { url, authorization } = args;

  const response = await request(app.callback())
    .get(url)
    .set({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(authorization ? { authorization } : {}),
    })
    .send();

  return response;
};

export const createDeleteApiCall = async (args = {}) => {
  const { url, authorization } = args;

  const response = await request(app.callback())
    .delete(url)
    .set({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(authorization ? { authorization } : {}),
    })
    .send();

  return response;
};
