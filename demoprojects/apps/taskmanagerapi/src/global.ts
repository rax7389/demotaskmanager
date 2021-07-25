import * as crypto from 'crypto';
export const TOKEN_SECRET = crypto.randomBytes(64).toString('hex');
