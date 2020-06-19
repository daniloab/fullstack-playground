import { getToken } from '../getToken';
import { base64 } from '../base64';

it('should return null for invalid token without base64', () => {
  const authorization = 'blah';
  const result = getToken(authorization);

  expect(result).toBe(null);
});

it('should return null for valid token without base64', () => {
  const authorization = 'blah:bleh';
  const result = getToken(authorization);

  expect(result).toBe(null);
});

it('should return null for invalid token with base64', () => {
  const authorization = base64('blah');
  const result = getToken(authorization);

  expect(result).toBe(null);
});

it('should return getToken result for valid token with base64', () => {
  const authorization = base64('blah:bleh');
  const result = getToken(authorization);

  expect(result).toEqual({ tenant: 'blah', user: 'bleh' });
});
