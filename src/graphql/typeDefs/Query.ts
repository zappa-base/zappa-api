import gql from 'graphql-tag';

export const Query = gql`
  type Query {
    users: [User]
    currentUser: User
  }
`;
