const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
// const products = require('./data/products');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const productRoutes = require('./routes/productRoutes');

dotenv.config();
connectDB();
const app = express();

// app.use(notFound);
// app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('API is running');
})

app.use('/api/products', productRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.inverse));