const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API documentation for the Contacts project (CSE 341 Week 2 project)',
    },
    host: 'cse341-contacts-nusk.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);