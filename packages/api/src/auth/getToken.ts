import { Base64String, unbase64 } from './base64';

export type Token = {
  clientId: string;
  clientSecret: string;
};

export const getToken = (authorization: Base64String): Token | null => {
  const concatToken = unbase64(authorization);
  const tokens = concatToken.split(':');

  if (tokens.length !== 2) {
    // console.log('invalid token:', authorization);
    return null;
  }

  return {
    tenant: tokens[0],
    user: tokens[1],
  };
};

export default getToken;
