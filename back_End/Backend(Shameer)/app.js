const express = require('express');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const app = express();

app.use(express.json());

app.use('/api/v1/products',productRoutes);
app.use('/api/v1/users',userRoutes); 


module.exports= app;
