// libraries
const ObjectId = require('mongoose').Types.ObjectId;

//functions
const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const ServerError = require('./ServerError');

// constants
const { VALIDATION } = require('../constants');

/**
 * [validateRequest validates each specified field in the request bases on validation object passes eachDoc]
 * @param  {[type]} req [route request containing fields to validate in body or query]
 * @param  {[type]} doc [array containing field place in request , its type to validate on and if mandatory or not]
 * @return {[type]}     [returns ServerError object if validation errors found, else returns null]
 */
const validateRequest = (req, doc) => {
  const errors = [];
  doc.forEach((eachDoc, i) => {
    if (eachDoc.mandatory) {
      let found = false;
      eachDoc.location.forEach((eachLocation) => {
        if (req[eachLocation] && req[eachLocation][eachDoc.field]){
          found = true
        }
      });
      if (!found) {
        errors.push(`${eachDoc.field} is required!`);
      }
    }

    eachDoc.location.forEach((eachLocation) => {
      // check data type if correct
      let value = req[eachLocation][eachDoc.field];
      if (req[eachLocation][eachDoc.field]) {
        if (eachDoc.type === 'string') {
          if (typeof value !== 'string') {
            errors.push(`'${eachDoc.field}' should be of type '${eachDoc.type}'`);
          }
        }
        if (eachDoc.type === 'objectId') {
          try {
            const mongoId = new ObjectId(value).toString();
          }
          catch (err) {
            errors.push(`'${eachDoc.field}' should be of type '${eachDoc.type}'`);
          }
        }
        if (eachDoc.type === 'array') {
          if (!Array.isArray(value)) {
            errors.push(`'${eachDoc.field}' should be of type '${eachDoc.type}'`);
          }
        }
        if (eachDoc.type === 'object') {
          if (!((!!value) && (value.constructor === Object))) {
            errors.push(`'${eachDoc.field}' should be of type '${eachDoc.type}'`);
          }
        }
        if (eachDoc.type === 'integer') {
          if (isNaN(value)) {
            errors.push(`'${eachDoc.field}' should be of type '${eachDoc.type}'`);
          }
        }
        if (eachDoc.type === 'email') {
          if (!regEx.test(String(value).toLowerCase())) {
            errors.push(`${eachDoc.field} should be of type ${eachDoc.type}`);
          }
        }
      }
    });
  });
  // if erros found return them as string
  if(errors.length){
    let msg = ''
    errors.forEach((each, i) => {
      if(i !== (errors.length -1)){
        msg += each + ', '
      } else {
        msg += each
      }
    })
    return new ServerError({
      message: msg,
      code: VALIDATION.ERROR_CODE
    })
  } else {
    // no erros found, return null
    return null
  }
}

/**
 * [sendResponse checks if data type is ServerError, then sends response with success: false
 * and error object, else sends data with success true]
 * @param  {[type]} res                [response to use to send data]
 * @param  {[type]} data               [data to send in response]
 * @return {[type]}      [description]
 */
const sendResponse  = (res, data) => {
  if (data instanceof ServerError) {
    return res.send({
      success: false,
      error: {
        message: data.message,
        code: data.getCode(),
      }
    });
  }
  else {
    return res.send({ success: true, data });
  }
}

module.exports = {
  validateRequest,
  sendResponse,
}
