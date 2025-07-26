// This file is for Express setup and the Swagger

const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// loading the env variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Swagger documentations
const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


module.exports = app;