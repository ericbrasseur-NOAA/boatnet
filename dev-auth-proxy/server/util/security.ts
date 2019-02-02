// Development (Test) Server JWT Routines
// See README.md notes if you want to generate your own keys.
// Intended for testing on localhost! These keys are public and thus provide no security.

import * as moment from 'moment';
import * as util from 'util';
import * as crypto from 'crypto';

import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as argon2 from 'argon2';

export const randomBytes = util.promisify(crypto.randomBytes);

export const signJwt = util.promisify(jwt.sign);

// Keys used for signing JWT
const RSA_PRIVATE_KEY = fs.readFileSync('./temp-priv-key.pem');
const RSA_PUBLIC_KEY = fs.readFileSync('./temp-pub-key.pem');

const SESSION_DURATION = 7200;

export async function createSessionToken(userInfo: any) {
  return signJwt({}, RSA_PRIVATE_KEY, {
    algorithm: 'RS256',
    expiresIn: SESSION_DURATION,
    subject: JSON.stringify(userInfo)
  });
}

export async function decodeJwt(token: string) {
  // For test/ debug
  const payload = await jwt.verify(token, RSA_PUBLIC_KEY);
  console.log('Decoded JWT payload', payload);
  return payload;
}

export async function createCsrfToken() {
  return await randomBytes(32).then(bytes => bytes.toString('hex'));
}
