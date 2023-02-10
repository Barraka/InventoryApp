var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const backendRouter = require('./routes/backendRoutes');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { debuglog } = require('util');
const mongoose = require('mongoose');

var app = express();

//Connection with mongoose
// mongoose.set('strictQuery', false);
// const mongodb = `mongodb+srv://myAtlasDBUser:Wonderboy1@myatlasclusteredu.nnrvhxq.mongodb.net/?retryWrites=true&w=majority`;
// async function db_connect() {
//     await mongoose.connect(mongodb);
// }
// db_connect().catch(e=> console.log('error: ', e));

//Connection to mongoDB node driver
// const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@myatlasclusteredu.nnrvhxq.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', backendRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
