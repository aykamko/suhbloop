// Modified from:
// https://github.com/mxstbr/react-boilerplate/blob/aacef636b49b739a0a98fdcae8df057b389da52a/app/utils/request.js
import 'whatwg-fetch';
import { store } from '../index'; // TODO(aleks, 07/14/16): ew

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function extractAuthHeaders(response) {
  if (response.headers.has('access-token')) {
    store.dispatch({
      type: 'UPDATE_AUTH',
      payload: {
        auth_token: response.headers.get('access-token'),
        client_id: response.headers.get('client'),
        uid: response.headers.get('uid'),
        expiry: response.headers.get('expiry'),
      },
    });
  }
  return response;
}

function parseJSON(response) {
  return response.json();
}

function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(extractAuthHeaders)
    .then(parseJSON)
    .then(data => data)
    .catch(err => ({ err }));
}

const apiServerPrefix = 'http://localhost:3000';

export default class APIRequester {
  static get(route, params) {
    const query = Object.keys(params || {})
                        .map(key => `${key}=${params[key]}`)
                        .join('&');
    return request(`${apiServerPrefix}${route}?${query}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('auth.authToken'),
        'token-type': 'Bearer',
        client: localStorage.getItem('auth.clientId'),
        expiry: localStorage.getItem('auth.expiry'),
        uid: localStorage.getItem('auth.uid'),
      },
    });
  }

  static post(route, body) {
    return request(`${apiServerPrefix}${route}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('auth.authToken'),
        'token-type': 'Bearer',
        client: localStorage.getItem('auth.clientId'),
        expiry: localStorage.getItem('auth.expiry'),
        uid: localStorage.getItem('auth.uid'),
      },
      body: JSON.stringify(body),
    });
  }
}
