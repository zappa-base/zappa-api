import gql from 'graphql-tag';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';

const typesArray = fileLoader(path.join(__dirname, './**/*.gql'));

const typesMerged = mergeTypes(typesArray, { all: true });

export const typeDefs = gql(typesMerged);
