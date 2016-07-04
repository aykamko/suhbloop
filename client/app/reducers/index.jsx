import { REQUEST_RESPONSES, RECEIVE_RESPONSES } from '../actions/api';

function responseListReducer(state = {
  isFetching: true,
  responses: [],
}, action) {
  switch (action.type) {
    case REQUEST_RESPONSES:
      return { ...state,
        isFetching: true,
      };
    case RECEIVE_RESPONSES:
      return { ...state,
        isFetching: false,
        responses: action.responses,
        lastUpdated: action.receivedAt,
      };
    default:
      return state;
  }
}

function indexReducer(state = {
  appConfig: { googleFormUrl: '' },
} /* action */) {
  return state;
}

export default {
  indexReducer,
  responseListReducer,
};
