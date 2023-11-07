import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose'



//connect database

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
// const connection = mongoose.connection;
// connection.on('error', (error) => {
//   console.log('error connectiong to database', error)
// })

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', require('./routes/users.routes'));
app.use('/api/bookings', require('./routes/bookings.routes'));
app.use('/api/admin', require('./routes/admin.routes'))
app.use('/api/*', (req, res) => {
  res.status(404).end();
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
