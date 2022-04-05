// constants
import {
  GET_EMPLOYEES,
  EMPLOYEE_ERROR,
  DELETE_EMPLOYEE,
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
  CURRENT_EMPLOYEE,
} from '../actionTypes';

/**
 * [employeeReducer]
 * updates employees in state based on type
 * get, error ,add ,edit ,delete
 */
const employeeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EMPLOYEES:
    console.log('in reducer get');
      return {
          ...state,
          employees: action.payload,
      };
    case EMPLOYEE_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case DELETE_EMPLOYEE:
    console.log('in delete reducer');
      return state;
    case ADD_EMPLOYEE:
    console.log('statee', state);
      state.employees.data.pop();
      return {
        ...state,
        employees : {
          ...state.employees,
          totalCount: state.employees.totalCount + 1,
          data: [action.payload, ...state.employees.data]
        }
      }
    case CURRENT_EMPLOYEE:
      return {
        ...state,
        currentEmployee: action.payload
      }
    case EDIT_EMPLOYEE:
      return state
    default:
      return state;
  }
}

export default employeeReducer;
