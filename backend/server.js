const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const { errorHandler } = require('../backend/middleware/errorMiddleware');
const connectDB = require('./config/db');


connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/car-item', require('./routes/carItemRoutes.all'));
app.use('/api/end-user/car-item', require('./routes/carItemRoutes.end-user'));
app.use('/api/admin/car-item', require('./routes/carItemRoutes.admin'));
app.use('/api/users', require('./routes/userRoutes'));


app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`))