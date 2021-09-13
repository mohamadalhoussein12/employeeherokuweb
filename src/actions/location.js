import { GET_LOCATIONS } from '../actionTypes';
import { getLocations } from '../api';


export const getAllLocations = () => async dispatch => {
  console.log('in get all departs');
    const result = await getLocations();
    console.log('result', result);
    dispatch({ type: GET_LOCATIONS, payload: result.data.data });
};
