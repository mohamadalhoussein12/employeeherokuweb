// libraries
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Department collection schema
const departmentSchema = mongoose.Schema({
  title: String,
  description: String,
}, {
  collection: 'Department'
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
