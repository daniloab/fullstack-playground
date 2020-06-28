import swaggerJSDoc from 'swagger-jsdoc';

import { version } from '../package.json';

import { config } from './config';

export const getSwaggerSpec = () => {
  // swagger definition
  const swaggerDefinition = {
    info: {
      title: 'Fullstack Playground API',
      version,
      description: 'Koa JS rest api',
      host: `localhost:${config.PORT}`,
      basePath: '/',
    },
  };

  // options for the swagger docs
  const options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: [],
  };

  // initialize swagger-jsdoc
  const swaggerSpec = swaggerJSDoc(options);

  return swaggerSpec;
};
