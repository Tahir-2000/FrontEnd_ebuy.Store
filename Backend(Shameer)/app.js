const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors());

app.use(express.json()); // a method inbuilt in express to recognize the incoming Request Object as a JSON Object
app.use(cookieParser());

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);


module.exports = app;