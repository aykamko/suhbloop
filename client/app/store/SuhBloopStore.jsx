import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import Immutable from 'immutable';

import thunkMiddleware from 'redux-thunk';

import reducers from '../reducers';
import { initialStates } from '../reducers';

export default props => {
  // This is how we get initial props Rails into redux.
  const { name } = props;
  // const { $$helloWorldState } = initialStates || {};

  // Redux expects to initialize the store using an Object, not an Immutable.Map
  const initialState = {
    $$suhBloopStore: Immutable.fromJS({
      name: 'suhBloop',
    }),
  };

  const reducer = combineReducers(reducers);
  const composedStore = compose(
    applyMiddleware(thunkMiddleware)
  );
  const storeCreator = composedStore(createStore);
  const store = storeCreator(reducer, initialState);

  return store;
};
