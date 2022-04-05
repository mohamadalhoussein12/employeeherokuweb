// libraries
const express = require('express');
const app = express();
const cors = require('cors');


// middlewares
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// setting global variables
global.__root   = __dirname + '/';

app.get('/api', (req, res) => {
  res.status(200).send('Connection Established');
});

//department
const department = require('./routes/department');
app.use('/api/department', department);

// location
const location = require('./routes/location');
app.use('/api/location', location);

// employee
const employee = require('./routes/employee');
app.use('/api/employee', employee);

module.exports = app;
