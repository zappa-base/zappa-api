import uuidv4 from 'uuid/v4';

import { hashToken } from './hashToken';

type ReturnType = [string, string | undefined];

export async function generateUUIDToken(withHash = false): Promise<ReturnType> {
  const uuid = uuidv4();
  let hash: string;

  if (withHash) {
    hash = hashToken(uuid);
  }

  return [uuid, hash];
}
