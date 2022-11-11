const express = require('express');
const app = express();

const CategoryRouter = require('./router/categories');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/uploads',express.static('uploads'));


app.use('/api/category', CategoryRouter);

module.exports = app;