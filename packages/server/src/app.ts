import Koa, { Request, Response } from 'koa';
import { config } from '@fullstack-playground/shared';
import convert from 'koa-convert';

import bodyParser from 'koa-bodyparser';
import koaLogger from 'koa-logger';
import { koaPlayground } from 'graphql-playground-middleware';
import Router from 'koa-router';
import graphqlHttp from 'koa-graphql';

import { schema } from './schema/schema';

const app = new Koa();
app.keys = [config.JWT_KEY];
const router = new Router();

// needed for sentry to log data correctly
app.use(bodyParser());

app.use(koaLogger());

router.all(
  '/playground',
  koaPlayground({
    endpoint: '/graphql',
  }),
);

router.all(
  '/graphql',
  convert(
    graphqlHttp(async (request: Request, ctx: Response, koaContext) => {
      return {
        graphiql: config.NODE_ENV !== 'production',
        schema,
        koaContext,
      };
    }),
  ),
);

app.use(router.routes()).use(router.allowedMethods());

export default app;
