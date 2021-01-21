const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
const ticketsRouter = require('./routes/api/v1/tickets');

const indexRouter = require('./routes/index');
const usersRouter =  require('./routes/users');
const path = require('path');

const app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(cors()); // Enable All CORS Requests
app.use(express.urlencoded({ extended: true }));

//
// Prepend ticketsRouter to /api/v1/tickets
//
app.use('/',indexRouter);
app.use('/users',usersRouter);
app.use('/api/v1/tickets', ticketsRouter);

//
// Declare store credentials. You will use your database id and password as you
// work on this project. Make those empty strings when you submit.
//


const dbuser = process.env.USER;
const dbpass = process.env.PASS;


//
// Declare mongoDB variable to the URI for your own database as you work on this
// project. Make the URI an empty string when you submit.
//
const mongoUri = `mongodb+srv://${dbuser}:${dbpass}@cluster0.4x8yu.mongodb.net/ticketapp?retryWrites=true&w=majority`;
// the uri i used = `mongodb+srv://${dbuser}:${dbpass}@cluster0.4x8yu.mongodb.net/ticketapp?retryWrites=true&w=majority`;
 



mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//
// connect to the mongo database using mongoUri
//

mongoose.connect(mongoUri).then(
  () => beReady(),
  err => console.error(err));

function beReady() {

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

}






module.exports = app;
