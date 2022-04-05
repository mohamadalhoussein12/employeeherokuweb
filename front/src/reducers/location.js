// constants
import { GET_LOCATIONS, LOCATIONS_ERROR } from '../actionTypes';

/**
 * locationReducer
 * @param  {Object} [state={}]
 * @return {[type]} updates locations in state and returns state
 */
const locationReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LOCATIONS:
      return {
          ...state,
          locations: action.payload,
      };
    case LOCATIONS_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

export default locationReducer;
