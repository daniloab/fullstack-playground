import { GraphQLSchema } from 'graphql';

// import MutationType from './MutationType';
import QueryType from './QueryType';

const _schema = new GraphQLSchema({
  query: QueryType,
  // mutation: MutationType,
});

export const schema = _schema;
