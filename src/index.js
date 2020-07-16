import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import reducers from './reducers';
import client from './middleware/client';
import apiMiddleware from './middleware/api';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

let composeEnhancers = compose;
if (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

const middlewares = [client, apiMiddleware, reduxThunk];
const store = createStore(
  reducers, composeEnhancers(applyMiddleware(...middlewares)),
);

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/:sudokuId" render={props => <App {...props} />} />
          </Switch>
        </Router>
      </Provider>
    </CssBaseline>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
