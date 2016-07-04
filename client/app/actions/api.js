import { createAction } from 'redux-actions';
import request from 'superagent';

const requestResponses = createAction('REQUEST_RESPONSES');
const receiveResponses = createAction('RECEIVE_RESPONSES', responses => ({
  responses,
  receivedAt: Date.now(),
}));

const requestResponse = createAction('REQUEST_RESPONSE', responseId => responseId);
const receiveResponse = createAction('RECEIVE_RESPONSE', (responseId, responseData) => ({
  responseId,
  responseData,
}));

export function fetchResponse(responseId) {
  return dispatch => {
    dispatch(requestResponse(responseId));
    return dispatch(receiveResponse(responseId, [{ hello: 'world' }]));
    // return request(`/google/form_response/${responseId}`)
    //   .end((err, res) => {
    //     dispatch(receiveResponses(responseId, JSON.parse(res.text)));
    //   });
  };
}

export function fetchResponses() {
  return dispatch => {
    dispatch(requestResponses());
    return request('/google/form_responses')
      .end((err, res) => {
        dispatch(receiveResponses(JSON.parse(res.text)));
      });
  };
}
