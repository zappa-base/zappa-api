import gql from 'graphql-tag';

export const UserType = gql`
  type User {
    email: String
    id: String
    nickname: String
    role: UserRole
  }
`;
