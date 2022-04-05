const DATABASE = {
  URL: 'mongodb+srv://admin:admin@cluster0.uuemx.mongodb.net/employeeDesk',
  // URL: 'mongodb+srv://admin:admin@cluster0.uuemx.mongodb.net/employeeDesk'
  ERROR_MESSAGE: 'Database Error',
  ERROR_CODE: 100,
}
exports.DATABASE = DATABASE;

const DB_MODELS = {
  DEPARTMENT: 'Department',
  LOCATION: 'Location',
  EMPLOYEE: 'Employee',
}
exports.DB_MODELS = DB_MODELS;

const VALIDATION = {
  ERROR_CODE: 300,
  INVALID_DEP_MESSAGE: 'Invalid Department',
  INVALID_LOC_MESSAGE: 'Invalid Location',
  EMAIL_EXISTS: 'Email Already Exists',
  INVALID_EMPLOYEE_ID: 'Invalid Employee ID',
}
exports.VALIDATION = VALIDATION;
