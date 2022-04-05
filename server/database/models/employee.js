// libraries
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Employee collection schema
const employeeSchema = mongoose.Schema({
  name: String,
  email: String,
  imageUrl: String,
  departmentId: { type: Schema.Types.ObjectId, ref: 'Department' },
  locationId: { type: Schema.Types.ObjectId, ref: 'Location' },
}, {
  collection: 'Employee'
});

employeeSchema.index({ departmentId: 1 });
employeeSchema.index({ locationId: 1 });
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
