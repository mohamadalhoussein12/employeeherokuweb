import { GET_DEPARTMENTS, GET_LOCATIONS } from "../actionTypes";


const locationReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_LOCATIONS:
        return {
            ...state,
            locations: action.payload,
        };

      default:
        return state;
    }
}

export default locationReducer;
