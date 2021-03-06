const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const { errorHandler } = require('../backend/middleware/errorMiddleware');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use('/api/carItems', require('./routes/carItemRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`))