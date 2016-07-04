import React from 'react';
import ReactOnRails from 'react-on-rails';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import createStore from './store/SuhBloopStore';
import Index from './containers/Index';
import ResponseList from './containers/ResponseList';

const SuhBloopApp = (props /* _railsContext */) => {
  const store = createStore(props);

  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(browserHistory, store);

  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Index} />
        <Route path="/log_in" component={ResponseList} />
      </Router>
    </Provider>
  );
};

// This is how react_on_rails can see the SuhBloopApp in the browser.
ReactOnRails.register({ SuhBloopApp });
