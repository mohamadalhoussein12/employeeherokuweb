// functions
const mongo = require('../mongo');
const ServerError = require('../../utils/ServerError');

// constants
const { DB_MODELS, VALIDATION } = require('../../constants');

/**
 * [getDepartments gets all departments using mongo helper]
 * @return {array} [array of departments or serverError with DatabaseError message on error]
 */
const getDepartments = async () => {
  const departments = await mongo.findAll({ model: DB_MODELS.DEPARTMENT, condition: {} });
  return departments;
}

/**
 * [validateDepartment validates if department exists]
 * @param  {[string]}  id [department _id to validate]
 * @return {object}    [if found object department else  serverError with validation error message]
 */
const validateDepartment = async (id) => {
  const department = await mongo.findById({ model: DB_MODELS.DEPARTMENT, id });
  if (!department) {
    return new ServerError({
      message: VALIDATION.INVALID_DEP_MESSAGE,
      code: VALIDATION.ERROR_CODE,
    })
  }
  return department;
}


module.exports = {
  getDepartments,
  validateDepartment,
}
