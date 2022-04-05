// libraries
const mongoose = require('mongoose');

//constants
const port = process.env.PORT || 3000;
const { DATABASE } = require('./constants');

// functions
const app = require('./index');

// connect to mongo db with url from constants
mongoose.connect(`${DATABASE.URL}?retryWrites=true`, {
  useNewUrlParser: true
}).then(() => {
    console.log('Mongo Connected');
    const server = app.listen(port, () => {
      console.log(`Server Listening on ${port}`);
    });
}).catch(err => {
  console.log('Error in Connecting to mongo', err);
  process.exit(-1);
});

module.exports = app;
