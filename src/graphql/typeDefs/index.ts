import gql  from 'graphql-tag';
import { UserType } from './User';
import { UserLoginType } from './UserLogin';

export const typeDefs = gql`
  type Query {
    users: [User]
  }

  type Mutation {
    login(email: String!, password: String!): UserLogin
    signup(email: String!, password: String!, nickname: String): UserLogin
  }

  ${UserLoginType}
  ${UserType}
`;