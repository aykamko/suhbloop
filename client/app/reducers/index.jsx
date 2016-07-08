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

const indexReducer = () => ({
  appConfig: { googleFormUrl: '' },
});

export default {
  form: formReducer,
  indexReducer,
  responseListReducer,
  responseReducer,
};
