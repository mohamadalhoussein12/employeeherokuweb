// libraries
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Location collection schema
const locationSchema = mongoose.Schema({
  name: String,
}, {
  collection: 'Location'
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
