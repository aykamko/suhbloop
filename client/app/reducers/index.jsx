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
  REQUEST_RESPONSES: state => ({ ...state,
    isFetching: true,
  }),
  RECEIVE_RESPONSES: (state, { payload }) => ({ ...state,
    isFetching: false,
    responses: payload.responses,
    lastUpdated: payload.receivedAt,
  }),
}, {
  isFetching: true,
  responses: [],
});

const authDefault = {
  loggedIn: false,
  authToken: null,
  clientId: null,
  uid: null,
  expiry: null,
};
const authReducer = handleActions({
  LOG_IN: (state, { payload }) => {
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
  },
  LOG_IN_FROM_LOCAL_STORAGE: (state) => ({ ...state,
    loggedIn: true,
    authToken: localStorage.getItem('auth.authToken'),
    clientId: localStorage.getItem('auth.clientId'),
    uid: localStorage.getItem('auth.uid'),
    expiry: localStorage.getItem('auth.expiry'),
  }),
  LOG_OUT: (state) => {
    for (const key of Object.keys(authDefault)) {
      localStorage.removeItem(`auth.${key}`);
    }

    return {
      ...state,
      ...authDefault,
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
