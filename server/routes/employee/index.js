// libraries
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// functions
const validationDoc = require('./validationDoc')
const {
  getEmployees,
  addEmployee,
  editEmployee,
  deleteEmployee,
} = require('../../database/helpers/employee');
const { validateRequest, sendResponse } = require('../../utils/utils');

//middlewares
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

/**
 * [getEmployees route get employees stored in db with limit and offset based on conditions
 * conditions: search input, employee specific department and employee specific location]
 * @type {[get]}
 */
router.get('/getEmployees', async (req, res) => {
  // validate request parameters
  const validationErrors = validateRequest(req, validationDoc.getEmployees);
  if (validationErrors) return sendResponse(res, validationErrors);

  //get employees with conditions from employee database helper
  const employees = await getEmployees({
    limit: req.query.limit,
    offset: req.query.offset,
    search: req.query.search,
    departmentId: req.query.departmentId,
    locationId: req.query.locationId,
  })
  sendResponse(res, employees);
})

/**
 * [addEmployee route creates employee in databse]
 *  * @type {[post]}
 */
router.post('/addEmployee', async (req, res) => {
  // validate request parameters
  const validationErrors = validateRequest(req, validationDoc.addEmployee);
  if (validationErrors) return sendResponse(res, validationErrors);

  // add employee from employee database helper
  const employee = await addEmployee({
    name: req.body.name,
    email: req.body.email,
    imageUrl: req.body.imageUrl,
    departmentId: req.body.departmentId,
    locationId: req.body.locationId,
  });
  sendResponse(res, employee);
})

/**
 * [editEmployee route edits employee based on id passed in request body]
 *  * @type {[put]}
 */
router.put('/editEmployee', async (req, res) => {
  // validate request parameters
  const validationErrors = validateRequest(req, validationDoc.editEmployee);
  if (validationErrors) return sendResponse(res, validationErrors);

  // edit employee from employee database helper
  const employee = await editEmployee({
    _id: req.body.employeeId,
    name: req.body.name,
    email: req.body.email,
    imageUrl: req.body.imageUrl,
    departmentId: req.body.departmentId,
    locationId: req.body.locationId,
  });
  sendResponse(res, employee);
})

/**
 * [deleteEmployee route deletes employee base on id passed in query]
 * @type {[delete]}
 */
router.delete('/deleteEmployee', async (req, res) => {
  // validate request parameters
  const validationErrors = validateRequest(req, validationDoc.deleteEmployee);
  if (validationErrors) return sendResponse(res, validationErrors);

  // edit employee from employee database helper
  const deletedEmployee = await deleteEmployee(req.query.employeeId);
  sendResponse(res, deletedEmployee);
})

module.exports = router;
