import { handleActions } from 'redux-actions';

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
  indexReducer,
  responseListReducer,
};
