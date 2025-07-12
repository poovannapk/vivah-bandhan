const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI Matrimony API',
      version: '1.0.0',
      description: 'Backend API docs for AI-powered Matrimony platform'
    },
    servers: [{ url: 'http://localhost:5000' }]
  },
  apis: ['./routes/*.js'] // files to scan for documentation
};

const specs = swaggerJsdoc(options);

module.exports = specs;
