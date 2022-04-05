// libraries
import thunk from 'redux-thunk';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';

//functions
import rootReducer from '../reducers';

const middleWare = [thunk];
const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleWare))
);

export default store;
