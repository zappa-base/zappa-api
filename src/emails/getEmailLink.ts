import { ApolloError } from 'apollo-server-core';

import { config } from '../config';
import { EmailEndpoints } from '../constants/EmailEndpoints';
import { EmailTemplates } from '../constants/EmailTemplates';

export function getEmailLink(
  token: string,
  template: EmailTemplates,
  endpoint: EmailEndpoints,
) {
  const url = config.urls[endpoint][template];

  if (!url) {
    throw new ApolloError('Invalid Endpoint Requested');
  }

  return url + '?token=' + token;
}
