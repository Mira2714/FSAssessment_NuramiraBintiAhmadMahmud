// This file is for Express setup and the Swagger

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes.js');
const errorHandler = require('./middlewares/errorHandler.js');

// loading the env variables
dotenv.config();

const app = express();

// Middleware
app.use(cors())
app.use(express.json());

// Swagger documentations
const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/courses', courseRoutes);

app.use('/api/users', userRoutes);

// Error Handler
app.use(errorHandler);

module.exports = app;