import React from 'react';
import ReactOnRails from 'react-on-rails';
import { Provider } from 'react-redux';

import createStore from './store/SuhBloopStore';
import SuhBloop from './containers/SuhBloop';

const SuhBloopApp = (props /* _railsContext */) => {
  const store = createStore(props);
  const reactComponent = (
    <Provider store={store}>
      <SuhBloop />
    </Provider>
  );
  return reactComponent;
};

// This is how react_on_rails can see the SuhBloopApp in the browser.
ReactOnRails.register({ SuhBloopApp });
