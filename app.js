const express = require('express');
const app = express();
const morgen = require('morgan');
const bodyParser = require('body-parser');
const products = require('./api/routes/products');
const orders = require('./api/routes/orders');
const mongoose = require('mongoose')

app.use(morgen('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://express-shop-new:' + process.env.ATLAS_AWS + '@express-shop.a1ejq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Allow-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next()
})

app.use('/products', products);
app.use('/orders', orders);

app.use((req, res, next) => {
    const err = new Error('not found route');
    err.status = 404;
    next(err)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message
    })
})

module.exports = app;