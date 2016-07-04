// This file is our manifest of all reducers for the app.
// See also /client/app/bundles/SuhBloop/store/suhBloopStore.jsx
// A real world app will likely have many reducers and it helps to organize them in one file.
import suhBloopReducer, { $$initialState as $$suhBloopState } from './suhBloopReducer';
import { REQUEST_RESPONSES, RECEIVE_RESPONSES } from '../actions/api';

function responseListReducer(state = {
  isFetching: true,
  responses: [],
}, action) {
  switch (action.type) {
    case REQUEST_RESPONSES:
      return {...state,
        isFetching: true,
      };
    case RECEIVE_RESPONSES:
      return {...state,
        isFetching: false,
        responses: action.responses,
        lastUpdated: action.receivedAt,
      };
    default:
      return state;
  }
}

export const initialStates = {
  $$suhBloopState,
};

export default {
  $$suhBloopStore: suhBloopReducer,
  responseListReducer
};
