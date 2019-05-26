import gql  from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    testQuery: String
  }

  type Mutation {
    testMutation(name: String!): String
  }
`;