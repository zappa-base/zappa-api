import gql from 'graphql-tag';

export const UserLoginType = gql`
  type UserLogin {
    token: String
    user: User
  }
`;