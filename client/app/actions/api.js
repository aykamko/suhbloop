import request from 'superagent';

export const REQUEST_RESPONSES = 'REQUEST_RESPONSES';
export const RECEIVE_RESPONSES = 'RECEIVE_RESPONSES';

function requestResponses() {
  return {
    type: REQUEST_RESPONSES,
  };
}

function receiveResponses(responses) {
  return {
    type: RECEIVE_RESPONSES,
    responses,
    receivedAt: Date.now(),
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
