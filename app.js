const express = require('express');
const path = require('path');
const tourRouter = require('./routes/tourRoutes');
const destinationRouter = require('./routes/destinationRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express(); //nhận request và xử lí request

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());      //convert request in json format to normal format
//app.use(express.urlencoded({extended: true}))     //dont need yet
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', viewRouter);
app.use('/destination', destinationRouter)
app.use('/tours', tourRouter);

app.all('*', (req, res, next) => {
  next(`Can't find ${req.originalUrl} on this server!`, 404);
});

module.exports = app;