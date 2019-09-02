import { GraphQLDate, GraphQLDateTime, GraphQLTime } from 'graphql-iso-date';
import GraphQLJSON from 'graphql-type-json';

export const CustomScalars = {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
  JSON: GraphQLJSON,
  Time: GraphQLTime,
};
