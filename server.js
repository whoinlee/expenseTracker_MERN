const path = require('path');
const express = require('express'); //-- web framework
const dotenv = require('dotenv');   //-- for global variables. loads environment variables from a .env file into process.env
const morgan = require('morgan');   //-- HTTP request logger middleware for node.js
const colors = require('colors');
const connectDB = require('./config/db');

dotenv.config({path: './config/config.env'});

connectDB();

const app = express();
app.use(express.json());    //-- allows to use bodyParser
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//app.get('/', (req, res) => res.send('Hello WhoIN')); 

//-- using router 
const transactions = require('./routes/transactions');  //-- using express.Router
app.use('/api/v1/transactions', transactions);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    //-- '*':anything except for the api routes, '/api/v1/transactions'
    //-- currentDir(__) >> client folder >> build folder >> index.html
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));