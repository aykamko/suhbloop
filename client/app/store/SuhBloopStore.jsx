import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import Immutable from 'immutable';

import thunkMiddleware from 'redux-thunk';

import reducers from '../reducers';

export default (props) => {
  const initialState = {
    $$suhBloopStore: Immutable.fromJS({
      appConfig: props.appConfig,
    }),
  };

  return createStore(
    combineReducers({
      ...reducers,
      routing: routerReducer,
    }),
    initialState,
    applyMiddleware(
      thunkMiddleware,
    ),
  );
};
