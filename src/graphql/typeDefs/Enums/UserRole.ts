import gql from 'graphql-tag';

import { UserRole } from '../../../db/entities/User';

const values = Object.values(UserRole).join('\n');

export const UserRoleType = gql`
  enum UserRole {
    ${values}
  }
`;
