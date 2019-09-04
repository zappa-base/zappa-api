import { ForbiddenError } from 'apollo-server-core';
import { defaultFieldResolver } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';

import { getRoleLevel } from '../../helpers/auth/getRoleLevel';

export class AuthDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: any) {
    const { resolve = defaultFieldResolver } = field;

    const { args: directiveArgs } = this;

    field.resolve = async function(...args: any) {
      if (!directiveArgs || !directiveArgs.requires) {
        return resolve.apply(this, args);
      }

      const context = args[2];
      const { user } = context;

      if (!user) {
        throw new ForbiddenError('Token Required: No API Token provided.');
      }

      if (getRoleLevel(user.role) < getRoleLevel(directiveArgs.requires)) {
        throw new ForbiddenError('Role requirement not met');
      }

      return resolve.apply(this, args);
    };
  }
}
