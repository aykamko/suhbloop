import { createAction } from 'redux-actions';

export const requestResponse = createAction('REQUEST_RESPONSE', responseId => responseId);
export const receiveResponse = createAction('RECEIVE_RESPONSE', (responseId, responseData) => ({
  responseId,
  responseData,
}));
