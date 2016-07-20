import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import createStore from './store/SuhBloopStore';
import Index from './containers/Index';
import ResponseList from './containers/ResponseList';
import Response from './containers/Response';
import LoginPage from './containers/pages/LoginPage';

export const store = createStore({});

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

function requireAuth(nextState, replace) {
  if (!store.getState().auth.loggedIn) {
    // redirect back to login.
    replace('/');
  }
}

function checkAuth(nextState, replace) {
  const authKeys = new Set(['auth_token', 'client_id', 'uid', 'expiry']);
  const queryKeys = new Set(Object.keys(nextState.location.query));
  const difference = [...authKeys].filter(x => !queryKeys.has(x));
  if (difference.length === 0) {
    store.dispatch({
      type: 'LOG_IN',
      authInfo: {
        authToken: nextState.location.query.auth_token,
        clientId: nextState.location.query.client_id,
        uid: nextState.location.query.uid,
        expiry: nextState.location.query.expiry,
      },
    });
    replace('/dashboard');
  } else if (store.getState().auth.loggedIn) {
    replace('/dashboard');
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={LoginPage} onEnter={checkAuth} />
      <Route onEnter={requireAuth}>
        <Route path="/dashboard" component={Index} />
        <Route path="/responses" component={ResponseList}>
          <Route path="/responses/:responseId" component={Response} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// TODO: remove this?
// This is how react_on_rails can see the SuhBloopApp in the browser.
// ReactOnRails.register({ SuhBloopApp });
