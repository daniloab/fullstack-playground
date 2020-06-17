// eslint-disable-next-line
import { Base64String, unbase64 } from './base64';

export type Token = {
  clientId: string;
  clientSecret: string;
};

// eslint-disable-next-line
export const getToken = (authorization: Base64String): Token | null => {
  // eslint-disable-next-line
  //   const concatToken = unbase64(authorization);
  //   const tokens = concatToken.split(':');
  //
  //   if (tokens.length !== 2) {
  //     // console.log('invalid token:', authorization);
  //     return null;
  //   }
  //
  //   return {
  //     clientId: tokens[0],
  //     clientSecret: tokens[1],
  //   };
  //
  //   const { clientId, clientSecret } = result;
  //
  //   // eslint-disable-next-line
  //   const user = await User.findOne({
  //     clientId,
  //     clientSecret,
  //     isActive: true,
  //   });
};

export default getToken;
