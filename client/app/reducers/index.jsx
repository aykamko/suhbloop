import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';

const responseReducer = handleActions({
  REQUEST_RESPONSE: state => ({ ...state,
    isFetching: true,
  }),
  RECEIVE_RESPONSE: (state, { payload }) => ({ ...state,
    ...payload,
    isFetching: false,
  }),
}, {
  isFetching: true,
  responseData: [],
});

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
}, {
  isFetching: true,
  responseList: [],
  err: null,
});

const authDefault = {
  loggedIn: Date.now() < (parseInt(localStorage.getItem('auth.expiry') || '0', 10) * 1000),
  authToken: localStorage.getItem('auth.authToken'),
  clientId: localStorage.getItem('auth.clientId'),
  uid: localStorage.getItem('auth.uid'),
  expiry: localStorage.getItem('auth.expiry'),
};
const updateAuth = (state, { payload }) => {
  const authInfo = {
    authToken: payload.auth_token,
    clientId: payload.client_id,
    uid: payload.uid,
    expiry: payload.expiry,
  };
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
  responseReducer,
};
