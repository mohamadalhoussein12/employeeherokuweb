// libraries
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// functions
const { sendResponse } = require('../../utils/utils');
const { getLocations } = require('../../database/helpers/location');

// middlewares
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

/**
 * [locations get all locations stored in db]
 * @type {[get]}
 */
router.get('/getLocations', async (req, res) => {
  // get all locations from location database helper
  const locations = await getLocations();
  sendResponse(res, locations);
})

module.exports = router;
