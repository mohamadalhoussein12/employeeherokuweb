// constants
import { GET_DEPARTMENTS, DEPARTMENTS_ERROR } from '../actionTypes';


/**
 * [departmentReducer
 * returns adds to current state departments from action payload
 * and returns the state
 */
const departmentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DEPARTMENTS:
      return {
          ...state,
          departments: action.payload,
      };
    case DEPARTMENTS_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

export default departmentReducer;
