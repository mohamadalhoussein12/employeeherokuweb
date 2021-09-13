import { GET_DEPARTMENTS } from "../actionTypes";


const departmentReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_DEPARTMENTS:
        return {
            ...state,
            departments: action.payload,
        };

      default:
        return state;
    }
}

export default departmentReducer;
