const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
// const products = require('./data/products');
const morgan = require('morgan'); 
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');  


console.log('__dirname',__dirname);

const dirname = __dirname + '/../';
console.log('dirname', dirname)

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// app.use((req, res, next) => {
//   console.log(req.ofiginalUrl);
//   next()
// })

// app.use(errorHandler);
// app.use(notFound);


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
// paypal config route
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(dirname, '/uploads')))

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(dirname, '/frontend/build')))
  app.get('*', (req, res) => res.sendFile(path.resolve(dirname, 'frontend', 'build', 'index.html')))
} else {
  app.get('/', (req, res) => {
    res.send('API is running');
  })
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.inverse));