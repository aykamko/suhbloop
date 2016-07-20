import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware, routerReducer } from 'react-router-redux';

import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import createSagaMiddleware from 'redux-saga';
import rootSaga from '~/sagas';

import reducers from '~/reducers';

export default (props) => {
  const initialState = {
    indexReducer: {
      appConfig: props.appConfig,
    },
  };

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    combineReducers({
      ...reducers,
      routing: routerReducer,
    }),
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(browserHistory),
        thunkMiddleware,
        sagaMiddleware,
        createLogger(),
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
