import hashjs from 'hash.js';

export function hashToken(token: string) {
  return hashjs
    .sha256()
    .update(token)
    .digest('hex');
}
