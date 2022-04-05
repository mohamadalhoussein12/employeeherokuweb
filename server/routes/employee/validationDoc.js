module.exports = {
  getEmployees : [
    { field: 'limit',  type: 'integer', mandatory: true, location: ['query']},
    { field: 'offset',  type: 'integer', mandatory: true, location: ['query']},
    { field: 'search',  type: 'string', mandatory: false, location: ['query']},
    { field: 'departmentId', type: 'objectId', mandatory: false, location: ['query']},
    { field: 'locationId', type: 'objectId', mandatory: false, location: ['query']},
  ],
  addEmployee : [
    { field: 'name',  type: 'string', mandatory: true, location: ['body']},
    { field: 'email',  type: 'email', mandatory: true, location: ['body']},
    { field: 'imageUrl',  type: 'string', mandatory: true, location: ['body']},
    { field: 'departmentId', type: 'objectId', mandatory: true, location: ['body']},
    { field: 'locationId', type: 'objectId', mandatory: true, location: ['body']},
  ],
  editEmployee : [
    { field: 'employeeId',  type: 'objectId', mandatory: true, location: ['body']},
    { field: 'name',  type: 'string', mandatory: true, location: ['body']},
    { field: 'email',  type: 'email', mandatory: true, location: ['body']},
    { field: 'imageUrl',  type: 'string', mandatory: true, location: ['body']},
    { field: 'departmentId', type: 'objectId', mandatory: true, location: ['body']},
    { field: 'locationId', type: 'objectId', mandatory: true, location: ['body']},
  ],
  deleteEmployee : [
    { field: 'employeeId',  type: 'objectId', mandatory: true, location: ['query']}
  ]
};
