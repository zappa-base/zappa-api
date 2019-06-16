import { Context } from 'apollo-server-core';
import { GraphQLResolveInfo } from 'graphql';

export type FirstArgument<T> = T extends (arg1: infer U, ...args: any[]) => any ? U : any;

export type IResolverArgs<T = any> = {
  [P in keyof T]: (
  parent: null | undefined,
  args: FirstArgument<T[P]>,
  ctx: Context,
  info?: GraphQLResolveInfo
  ) => any
 };