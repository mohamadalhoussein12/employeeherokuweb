// libraries
const mongoose = require('mongoose');

// functions
const mongo = require('../mongo');
const { validateDepartment } = require('./department');
const { validateLocation } = require('./location');
const ServerError = require('../../utils/ServerError');

// constants
const { DB_MODELS, VALIDATION } = require('../../constants');

/**
 * [getEmployees gets employees with limit and condition search, departmentId and locationId]
 * @param  {[object]}  params
 * limit: {int} number of documents to get
 * offset: {int} index to skip to
 * departmentId: {string} department id to only find employees in
 * locationId: {string} location id to only find employees in
 * search: {string} to only match employees with name or email containing it
 * @return {array}  array of employees found or serverError with either validationError message or Database error message
 */
const getEmployees = async (params) => {
  const {
      limit,
      offset,
      departmentId,
      locationId,
      search
  } = params;

  if (departmentId) {
    // validate department, return Invalid Department serverError if not found
    const department = await validateDepartment(departmentId);
    if (department instanceof Error) return department;
  }

  if (locationId) {
    // validate location, return Invalid Location serverError if not found
    const location = await validateLocation(locationId);
    if (location instanceof Error) return location;
  }
  // build condition object to query
  let condition = {};
  if (departmentId || locationId || search) {
    condition = {
      '$and': []
    }
  }
  if (departmentId) {
    condition['$and'].push({ departmentId: mongoose.Types.ObjectId(departmentId) });
  }
  if (locationId) {
    condition['$and'].push({ locationId: mongoose.Types.ObjectId(locationId) });
  }
  if (search) {
    condition['$and'].push({
      '$or':[
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ]
    })
  }

  // find employees
  const employees = await mongo.findWithLimitAndPopulateMany({
    model: DB_MODELS.EMPLOYEE,
    condition,
    populate1: 'departmentId',
    populate2: 'locationId',
    limit,
    offset,
  })
  return employees;

}

/**
 * [addEmployee creates employee]
 * @param  {[object]}  employee object with name, email, departmentId and locationId
 * @return {object}  created employee or serverError with either validation message or database error
 */

const addEmployee = async (record) => {
  const {
    departmentId,
    locationId,
    email,
  } = record;
  // validate employee email , check that no other employee has it
  const employeeEmail = await validateEmployeeEmail(email);
  if (employeeEmail instanceof Error) return employeeEmail;

  //validate department, check if exists
  const department = await validateDepartment(departmentId);
  if (department instanceof Error) return department;

  // validate location, check if exists
  const location = await validateLocation(locationId);
  if (location instanceof Error) return location;

  // if created successfully , get it and return it for front end to add it directly
  const employee = await mongo.create({ model: DB_MODELS.EMPLOYEE, record });
  if (employee && employee._id) {
    const createdEmployee = await mongo.findOneAndPopulateMany({
      model: DB_MODELS.EMPLOYEE,
      condition:{ _id: employee },
      populate1: 'departmentId',
      populate2: 'locationId'
    })
    return createdEmployee;
  }
  else {
    return employee;
  }
}

/**
 * [editEmployee updates employee field with specific _id]
 * @param  {[object]}  record employee updated record
 * @return {object}        [description]
 */

const editEmployee = async (record) => {
  const {
    _id,
    departmentId,
    locationId,
    email,
  } = record;

  // get employee to edit to validate it exists
  const employeeToEdit = await mongo.findById({
    model: DB_MODELS.EMPLOYEE,
    id: _id
  })
  if (employeeToEdit && employeeToEdit._id) {
    // validate email to check it's not linked to any other employee
    const employeeEmail = await validateEmployeeEmail(email, employeeToEdit._id);
    if (employeeEmail instanceof Error) return employeeEmail;

    // validate department, check if exists
    const department = await validateDepartment(departmentId);
    if (department instanceof Error) return department;

    // validate location, check if exists
    const location = await validateLocation(locationId);
    if (location instanceof Error) return location;

    // update employee, if success return its object else return serverError with database error message
    const employee = await mongo.findByIdAndUpdate({ model: DB_MODELS.EMPLOYEE, _id, record });
    return employee;
  }
  else {
    // if employee not exists, return validation error with message Invalid Emoloyee Id
    return new ServerError({
      message: VALIDATION.INVALID_EMPLOYEE_ID,
      code: VALIDATION.ERROR_CODE,
    })
  }
}

/**
 * [deleteEmployee description]
 * @param  {[string]}  employeeId employee id to remove
 * @return {boolean}  if success true, else serverError with validation error message
 */
const deleteEmployee = async (employeeId) => {
  const employee = await mongo.findByIdAndRemove({
    model: DB_MODELS.EMPLOYEE,
    id: employeeId
  })
  // if false, then employee not found , return Invalid Employee Id
  if (!employee) {
    return new ServerError({
      message: VALIDATION.INVALID_EMPLOYEE_ID,
      code: VALIDATION.ERROR_CODE,
    })
  }
  return employee;
}

/**
 * [validateEmployeeEmail validate employee email, check if no other employee has it]
 * @param  {[string]}  email  email to validate
 * @param  {[string]}  [employeeId=null] employeeId, default to null if validating new email account not on edit
 * @return {Promise}                   [description]
 */
const validateEmployeeEmail = async (email, employeeId=null) => {
  let condition = { email }
  if (employeeId) condition = { ...condition, _id: { $ne: employeeId }};
  const employee = await mongo.findOne({
    model: DB_MODELS.EMPLOYEE,
    condition,
  })
  // if employee with this email exists, return validation error with message Email Already Exists
  if (employee) {
    return new ServerError({
      message: VALIDATION.EMAIL_EXISTS,
      code: VALIDATION.ERROR_CODE,
    })
  }
  else {
    return employee;
  }

}


module.exports = {
  getEmployees,
  addEmployee,
  editEmployee,
  deleteEmployee,
  validateEmployeeEmail,
}
