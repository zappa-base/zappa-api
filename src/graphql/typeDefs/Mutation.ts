import gql from 'graphql-tag';

export const Mutation = gql`
  type Mutation {
    authorize(token: String!): UserLogin
    confirmUser(token: String!): UserLogin
    login(email: String!, password: String!): UserLogin
    requestReset(email: String!): Boolean
    resetPassword(password: String!, token: String!): UserLogin
    resendConfirmation(email: String!): Boolean
    signup(email: String!, password: String!, nickname: String): Boolean
  }
`;
