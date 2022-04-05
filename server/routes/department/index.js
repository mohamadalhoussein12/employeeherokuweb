// libraries
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// functions
const { sendResponse } = require('../../utils/utils');
const { getDepartments } = require('../../database/helpers/department');

// middlewares
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

/**
 * [departments get all departments stored in db]
 * @type {[get]}
 */
router.get('/getDepartments', async (req, res) => {
  // get all departments from department database helper
  const departments = await getDepartments();
  sendResponse(res, departments);
})

module.exports = router;
