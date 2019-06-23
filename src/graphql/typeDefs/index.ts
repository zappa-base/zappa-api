import { UserRoleType } from './Enums/UserRole';
import { Mutation } from './Mutation';
import { Query } from './Query';
import { UserType } from './User';
import { UserLoginType } from './UserLogin';

export const typeDefs = [
  Mutation,
  Query,
  UserLoginType,
  UserRoleType,
  UserType,
];
