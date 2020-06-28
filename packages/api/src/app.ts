import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import Router from 'koa-router';
import cors from 'koa-cors';

import { version } from '../package.json';

import { OK } from './common/consts';
import auth from './auth/auth';
import authEmail from './api/auth/v1/login/authEmail';
import authPassword from './api/auth/v1/login/authPassword';
import userGetAll from './api/user/v1/userGetAll';
import userGet from './api/user/v1/userGet';
import { getSwaggerSpec } from './swaggerSpec';
import userDelete from './api/user/v1/userDelete';
const app = new Koa();

const routerAuth = new Router();
const routerOpen = new Router();

app.use(logger());
app.use(cors({ maxAge: 86400 }));
app.use(bodyParser());

routerOpen.get('/swagger.json', ctx => {
  const swaggerSpec = getSwaggerSpec();
  ctx.body = swaggerSpec;
});

//Open APIS (APIs that dont need to Authenticate)
routerOpen.get('/api/version', ctx => {
  ctx.status = 200;
  ctx.body = {
    status: OK,
    message: version,
  };
});

// routerOpen.post('/api/user/v1/signup', userSignUp);
// routerOpen.post('/api/user/v1/login', userLogin);

app.use(routerOpen.routes());

//Authorized APIs
//Beyond this points APIS need to be Authenticated

routerAuth.use(auth);

// auth
routerAuth.post('/api/auth/v1/login/email', authEmail);
routerAuth.post('/api/auth/v1/login/password', authPassword);

// user
routerAuth.get('/api/user/v1/users', userGetAll);
routerAuth.get('/api/user/v1/users/:id', userGet);
routerAuth.delete('/api/user/v1/users/:id', userDelete);

app.use(routerAuth.routes());

// Default not found 404
app.use(ctx => {
  ctx.status = 404;
});

export default app;
