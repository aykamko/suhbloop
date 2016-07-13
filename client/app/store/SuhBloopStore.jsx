import { createStore, applyMiddleware, combineReducers } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware, routerReducer } from 'react-router-redux';

import thunkMiddleware from 'redux-thunk';

import reducers from '../reducers';

export default (props) => {
  const initialState = {
    indexReducer: {
      appConfig: props.appConfig,
    },
  };

  return createStore(
    combineReducers({
      ...reducers,
      routing: routerReducer,
    }),
    initialState,
    applyMiddleware(
      routerMiddleware(browserHistory),
      thunkMiddleware,
    ),
  );
};
