import { serve, setup } from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: 'json' };

const options = {
  customSiteTitle: 'API ĐẶT VÉ XEM PHIM',
  customCss: '.topbar-wrapper img',
  // Add securityDefinitions for JWT authentication
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
  // Add security for all paths by default
  security: [
    {
      bearerAuth: [],
    },
  ],
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:1812',
        description: 'Local server',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

export default function (app) {
  // Set up Swagger middleware
  app.use('/api-docs', serve, setup(swaggerDocument, options));
};
