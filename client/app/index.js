import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import createStore from './store/SuhBloopStore';
import Index from './containers/Index';
import ResponseList from './containers/ResponseList';
import Response from './containers/Response';

const store = createStore({});

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Index} />
      <Route path="/responses" component={ResponseList}>
        <Route path="/response/:responseId" component={Response} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// TODO: remove this?
// This is how react_on_rails can see the SuhBloopApp in the browser.
// ReactOnRails.register({ SuhBloopApp });
