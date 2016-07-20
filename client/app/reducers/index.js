import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';

const handleResponseAction = (state, { type, payload }) => {
  const { responseData } = state;
  const newResponseData = (() => {
    switch (type) {
      case 'RESPONSE_REQUEST':
        return { ...responseData,
          [payload.id]: { ...responseData[payload.id],
            isFetching: true,
          },
        };
      case 'RESPONSE_SUCCESS':
        return { ...responseData,
          [payload.id]: { ...responseData[payload.id],
            isFetching: false,
            response: payload.response,
          },
        };
      // TODO
      // case 'RESPONSE_FAILURE':
      default:
        return responseData;
    }
  })();

  return {
    ...state,
    responseData: newResponseData,
  };
};

const responseListReducer = handleActions({
  RESPONSE_LIST_REQUEST: state => ({ ...state,
    isFetching: true,
    err: null,
  }),
  RESPONSE_LIST_SUCCESS: (state, { payload }) => ({ ...state,
    isFetching: false,
    responseList: payload.responseList,
    lastUpdated: payload.receivedAt,
    err: null,
  }),
  RESPONSE_LIST_FAILURE: (state, err) => ({ ...state,
    isFetching: false,
    err,
  }),
  RESPONSE_REQUEST: handleResponseAction,
  RESPONSE_SUCCESS: handleResponseAction,
  RESPONSE_FAILURE: handleResponseAction,
}, {
  isFetching: true,
  responseList: [],
  responseData: {},
  err: null,
});

const authDefault = {
  loggedIn: Date.now() < (parseInt(localStorage.getItem('auth.expiry') || '0', 10) * 1000),
  authToken: localStorage.getItem('auth.authToken'),
  clientId: localStorage.getItem('auth.clientId'),
  uid: localStorage.getItem('auth.uid'),
  expiry: localStorage.getItem('auth.expiry'),
};
const updateAuth = (state, { authInfo }) => {
  for (const key of Object.keys(authInfo)) {
    localStorage.setItem(`auth.${key}`, authInfo[key]);
  }

  return {
    ...state,
    loggedIn: true,
    ...authInfo,
  };
};
const authReducer = handleActions({
  LOG_IN: updateAuth,
  UPDATE_AUTH: updateAuth,
  LOG_OUT: (state) => {
    for (const key of Object.keys(authDefault)) {
      localStorage.removeItem(`auth.${key}`);
    }

    return {
      ...state,
      loggedIn: false,
      authToken: null,
      clientId: null,
      uid: null,
      expiry: null,
    };
  },
}, authDefault);

const indexReducer = () => ({
  appConfig: { googleFormUrl: '' },
});

export default {
  auth: authReducer,
  form: formReducer,
  indexReducer,
  responseListReducer,
};
