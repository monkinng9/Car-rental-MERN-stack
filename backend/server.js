const express = require('express');
const dotenv = require('dotenv').config;
const port = process.env.PORT || 5000;

const app = express();

app.use('/api/carItems', require('./routes/carRentalRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`))