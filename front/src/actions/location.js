// constants
import { GET_LOCATIONS, LOCATIONS_ERROR} from '../actionTypes';

// api
import { getLocations } from '../api';

/**
 * [getAllLocations from getLocations api
 * gets locations and dispatch them or error
 */
export const getAllLocations = () => async dispatch => {
  try {
    const result = await getLocations();
    if (result && result.data && !result.data.success) {
      dispatch({ type: LOCATIONS_ERROR, payload: result.data.error.message });
    }
    else {
      dispatch({ type: GET_LOCATIONS, payload: result.data.data });
    }
  }
  catch (err) {
    dispatch({ type: LOCATIONS_ERROR, payload: err.message });
  }
};
