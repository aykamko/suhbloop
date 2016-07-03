import { createStore, applyMiddleware, combineReducers } from 'redux';
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
    combineReducers(reducers),
    initialState,
    applyMiddleware(
      thunkMiddleware,
    ),
  );
};
