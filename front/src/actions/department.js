// constants
import { GET_DEPARTMENTS, DEPARTMENTS_ERROR } from '../actionTypes';

// api
import { getDepartments } from '../api';

/**
 * getAllDepartments
 * gets all departments from api and dispatch them
 */
export const getAllDepartments = () => async dispatch => {
  try {
    const result = await getDepartments();
    if (result && result.data && !result.data.success) {
      dispatch({ type: DEPARTMENTS_ERROR, payload: result.data.error.message });
    }
    else {
      dispatch({ type: GET_DEPARTMENTS, payload: result.data.data });
    }
  }
  catch (err) {
    dispatch({ type: DEPARTMENTS_ERROR, payload: err.message });
  }
};
