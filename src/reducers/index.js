// libraries
import { combineReducers } from 'redux';

// functions
import departmentReducer from './department';
import locationReducer from './location';
import employeeReducer from './employee';

const rootReducer = combineReducers({
  departments: departmentReducer,
  locations: locationReducer,
  employees: employeeReducer,
});

export default rootReducer;
