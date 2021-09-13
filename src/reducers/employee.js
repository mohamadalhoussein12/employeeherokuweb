import {
  GET_EMPLOYEES,
  EMPLOYEE_ERROR,
  DELETE_EMPLOYEE,
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
  CURRENT_EMPLOYEE,
} from "../actionTypes";


const employeeReducer = (state = {}, action) => {
  console.log('in emp reducer', action);
    switch (action.type) {
      case GET_EMPLOYEES:
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
        return state;
      case ADD_EMPLOYEE:
        return {
          ...state,
          employees : {
            ...state.employees,
            totalCount: state.employees.totalCount,
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
