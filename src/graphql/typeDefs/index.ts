import gql  from 'graphql-tag';
import { UserType } from './User';
import { UserLoginType } from './UserLogin';

export const typeDefs = gql`
  type Query {
    users: [User]
  }

  type Mutation {
    authorize(token: String!): UserLogin
    confirmUser(token: String!): UserLogin
    login(email: String!, password: String!): UserLogin
    resendConfirmation(email: String!): Boolean
    signup(email: String!, password: String!, nickname: String): Boolean
  }

  ${UserLoginType}
  ${UserType}
`;