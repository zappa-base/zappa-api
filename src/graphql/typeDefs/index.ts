// import { UserRoleType } from './Enums/UserRole';
// import { Mutation } from './Mutation';
// import { Query } from './Query';
// import { UserType } from './User';
// import { UserLoginType } from './UserLogin';

// export const typeDefs = [
//   Mutation,
//   Query,
//   UserLoginType,
//   UserRoleType,
//   UserType,
// ];

// const path = require('path')
// const mergeGraphqlSchemas = require('merge-graphql-schemas')
// const fileLoader = mergeGraphqlSchemas.fileLoader
// const mergeTypes = mergeGraphqlSchemas.mergeTypes

import gql from 'graphql-tag';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';

const typesArray = fileLoader(path.join(__dirname, './**/*.gql'));

const typesMerged = mergeTypes(typesArray, { all: true });

export const typeDefs = gql(typesMerged);
