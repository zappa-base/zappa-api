import uuidv4 from 'uuid/v4';
import hashjs from 'hash.js';

type ReturnType = [string, string | undefined];

export async function generateUUIDToken(withHash = false): Promise<ReturnType> {
  const uuid = uuidv4();
  let hash: string;

  if (withHash) {
    hash = hashjs.sha256().update(uuid).digest('hex');
  }

  return [uuid, hash];

}