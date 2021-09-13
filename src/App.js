// libraries
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';

// files
import Employees from './pages/Employees';
import store from './store/index';

// css
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/employees'>
            <Employees />
          </Route>
          <Route path='/'>
            <Employees />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
