const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'Description of your API',
    },
  },
  apis: ['./routes/*.js'], // Path to the API routes folder
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;

