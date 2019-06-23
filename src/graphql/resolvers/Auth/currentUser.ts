import { AuthenticationError } from 'apollo-server-core';

export async function currentUser(_obj: any, _args: any, context: any) {
  if (!context.user) {
    throw new AuthenticationError('Invalid Token');
  }

  return context.user;
}
