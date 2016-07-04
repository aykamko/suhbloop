import { createAction } from 'redux-actions';
import request from 'superagent';

const requestResponses = createAction('REQUEST_RESPONSES');
const receiveResponses = createAction('RECEIVE_RESPONSES', responses => ({
  responses,
  receivedAt: Date.now(),
}));

export function fetchResponses() {
  return dispatch => {
    dispatch(requestResponses());
    return request('/google/form_responses')
      .end((err, res) => {
        dispatch(receiveResponses(JSON.parse(res.text)));
      });
  };
}
