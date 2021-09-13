import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { Provider } from "react-redux";

import './App.css'
import Employees from './pages/Employees';
import store from './store/index';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/employees">
            <Employees />
          </Route>
          <Route path="/">
            <Employees />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
