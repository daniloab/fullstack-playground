import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { version } from '../../package.json';
import { GraphQLContext } from '../types';

const QueryType = new GraphQLObjectType<Record<string, unknown>, GraphQLContext>({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    id: globalIdField('Query'),
    version: {
      type: GraphQLString,
      resolve: () => version,
    },
  }),
});

export default QueryType;
