import { createAction } from 'redux-actions';
import request from '../utils/superagent';

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
    return request
      .get(`/google/form_responses/${responseId}`)
      .end((err, res) => {
        console.log('wat');
        const responseData = JSON.parse(JSON.parse(res.text).json_data);
        dispatch(receiveResponse(responseId, responseData));
      });
  };
}

export function fetchResponses() {
  return dispatch => {
    dispatch(requestResponses());
    return request
      .get('/google/form_responses')
      .end((err, res) => {
        dispatch(receiveResponses(JSON.parse(res.text)));
      });
  };
}
