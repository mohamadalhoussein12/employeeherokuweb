// functions
const mongo = require('../mongo');
const ServerError = require('../../utils/ServerError');
// constants
const { DB_MODELS, VALIDATION } = require('../../constants');

/**
 * [getLocations gets all locations using mongo helper]
 * @return {array} [array of found locations or serverError on error]
 */
const getLocations = async () => {
  const locations = await mongo.findAll({ model: DB_MODELS.LOCATION, condition: {} });
  return locations;
}

/**
 * [validateLocation validates location if exists]
 * @param  {[string]}  location _id to validate
 * @return {object}    [location found on success or serverError with validation error message]
 */
const validateLocation = async (id) => {
  const location = await mongo.findById({ model: DB_MODELS.LOCATION, id });
  if (!location) {
    return new ServerError({
      message: VALIDATION.INVALID_LOC_MESSAGE,
      code: VALIDATION.ERROR_CODE,
    })
  }
  return location;
}


module.exports = {
  getLocations,
  validateLocation,
}
