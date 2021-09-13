import { GET_DEPARTMENTS } from '../actionTypes';
import { getDepartments } from '../api';

export const getAllDepartments = () => async dispatch => {
  console.log('in get all departs');
    const result = await getDepartments();
    console.log('result', result);
    dispatch({ type: GET_DEPARTMENTS, payload: result.data.data });
};
