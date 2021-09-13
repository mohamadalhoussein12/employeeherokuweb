// constants
import {
  GET_EMPLOYEES,
  EMPLOYEE_ERROR,
  ADD_EMPLOYEE,
} from '../actionTypes';

// api
import {
  getEmployees,
  deleteEmployeeById,
  addEmployeeApi,
  editEmployeeApi,
} from '../api';

/**
 * getAllEmployees gets employees from api and dispatches them to state
 */
export const getAllEmployees = ({ search, departmentId, locationId, offset }) => async dispatch => {
  try {
    const result = await getEmployees({ search, departmentId, locationId, offset });
    if (result && result.data && !result.data.success) {
      dispatch({ type: EMPLOYEE_ERROR, payload: result.data.error.message });
    }
    else {
      dispatch({ type: GET_EMPLOYEES, payload: result.data.data });
    }
  }
  catch (err) {
    dispatch({ type: EMPLOYEE_ERROR, payload: err.message});
  }
};

/**
 * deletes employe with _id employeeId using deleteEmployeeById api
 */
export const deleteEmployee = ({ employeeId, getEmployeesCondtion }) => async dispatch => {
  try {
    const result = await deleteEmployeeById({ employeeId });
    if (result && result.data && !result.data.success) {
      dispatch({ type: EMPLOYEE_ERROR, payload: result.data.error.message });
    }
    else {
      const {
        search,
        departmentId,
        locationId,
        offset,
      } = getEmployeesCondtion;
      const getResult = await getEmployees({ search, departmentId, locationId, offset });
      if (getResult && getResult.data && !getResult.data.success) {
        dispatch({ type: EMPLOYEE_ERROR, payload: result.data.error.message });
      }
      else {
        dispatch({ type: GET_EMPLOYEES, payload: getResult.data.data });
      }
    }
  }
  catch (err) {
    dispatch({ type: EMPLOYEE_ERROR, payload: err.message});
  }
};

/**
 * creates employe using addEmployeeApi
 */
export const addEmployee = (employee) => async dispatch => {
  try {
    const result = await addEmployeeApi({
      name: employee.name,
      email: employee.email,
      imageUrl: employee.imageUrl,
      departmentId: employee.departmentId,
      locationId: employee.locationId
     });
    if (result && result.data && !result.data.success) {
      dispatch({ type: EMPLOYEE_ERROR, payload: result.data.error.message });
    }
    else {
      dispatch({ type: ADD_EMPLOYEE, payload: result.data.data });
    }
  }
  catch (err) {
    dispatch({ type: EMPLOYEE_ERROR, payload: err.message });
  }
};

/**
 * creates employe using editEmployeeApi
 */
export const editEmployee = ({ employee, getEmployeesCondtion }) => async dispatch => {
  try {
    const result = await editEmployeeApi({
      employeeId: employee._id,
      name: employee.name,
      email: employee.email,
      imageUrl: employee.imageUrl,
      departmentId: employee.departmentId,
      locationId: employee.locationId
     });
    if (result && result.data && !result.data.success) {
      dispatch({ type: EMPLOYEE_ERROR, payload: result.data.error.message });
    }
    else {
      const {
        search,
        departmentId,
        locationId,
        offset,
      } = getEmployeesCondtion;
      const getResult = await getEmployees({ search, departmentId, locationId, offset });
      if (getResult && getResult.data && !getResult.data.success) {
        dispatch({ type: EMPLOYEE_ERROR, payload: result.data.error.message });
      }
      else {
        dispatch({ type: GET_EMPLOYEES, payload: getResult.data.data });
      }
    }
  }
  catch (err) {
    dispatch({ type: EMPLOYEE_ERROR, payload: err.message });
  }
};
