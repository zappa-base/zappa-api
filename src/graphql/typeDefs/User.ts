import gql from 'graphql-tag';

export const UserType = gql`
  type User {
    nickname: String
    email: String
  }
`;