import {
  GET_EMPLOYEES,
  EMPLOYEE_ERROR,
  DELETE_EMPLOYEE,
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE
} from '../actionTypes';

import {
  getEmployees,
  deleteEmployeeById,
  addEmployeeApi,
  editEmployeeApi,
} from '../api';

export const getAllEmployees = ({ search, departmentId, locationId, offset }) => async dispatch => {
  console.log('in get all employees');
  try {
    const result = await getEmployees({ search, departmentId, locationId, offset });
    console.log('result', result);
    dispatch({ type: GET_EMPLOYEES, payload: result.data.data });
  }
  catch (err) {
    dispatch({ type: EMPLOYEE_ERROR, payload: err.message});
  }
};

export const deleteEmployee = ({ employeeId }) => async dispatch => {
  try {
    console.log('in get all employees');
    const result = await deleteEmployeeById({ employeeId });
    console.log('result', result);
    if (result && result.data && result.data.success === 'false') {
      console.log('in if');
      dispatch({ type: EMPLOYEE_ERROR, payload: result.data.error.message });
    }
    else {
      dispatch({ type: DELETE_EMPLOYEE, payload: result.data.data });
    }
  }
  catch (err) {
    dispatch({ type: EMPLOYEE_ERROR, payload: err.message});
  }
};

export const addEmployee = (employee) => async dispatch => {
  console.log('emp to create11', employee);
  try {
    console.log('in get all employees');
    const result = await addEmployeeApi({
      name: employee.name,
      email: employee.email,
      imageUrl: employee.imageUrl,
      departmentId: employee.departmentId,
      locationId: employee.locationId
     });
    console.log('result', result);
    if (result && result.data && !result.data.success) {
      console.log('in if');
      dispatch({ type: EMPLOYEE_ERROR, payload: result.data.error.message });
    }
    else {
      console.log('in else');
      dispatch({ type: ADD_EMPLOYEE, payload: result.data.data });
    }
  }
  catch (err) {
    console.log('err', err);
    dispatch({ type: EMPLOYEE_ERROR, payload: err.message });
  }
};

export const editEmployee = (employee) => async dispatch => {
  console.log('emp to create11', employee);
  try {
    console.log('in get all employees');
    const result = await editEmployeeApi({
      employeeId: employee._id,
      name: employee.name,
      email: employee.email,
      imageUrl: employee.imageUrl,
      departmentId: employee.departmentId,
      locationId: employee.locationId
     });
    console.log('result', result);
    if (result && result.data && !result.data.success) {
      console.log('in if');
      dispatch({ type: EMPLOYEE_ERROR, payload: result.data.error.message });
    }
    else {
      console.log('in else');
      dispatch({ type: EDIT_EMPLOYEE, payload: result.data.data });
    }
  }
  catch (err) {
    console.log('err', err);
    dispatch({ type: EMPLOYEE_ERROR, payload: err.message });
  }
};
