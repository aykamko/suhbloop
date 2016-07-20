import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';

import API from 'app/utils/API';

import { responseSuccess, responseFailure } from './index';

function* fetchResponse({ payload }) {
  const id = payload.id;
  try {
    const response = yield call(API.get, API.Constants.google.formResponses.show(id));
    yield put(responseSuccess(id, response));
  } catch (e) {
    yield put(responseFailure(e.message));
  }
}

function* responseSaga() {
  yield fork(takeLatest, 'RESPONSE_REQUEST', fetchResponse);

  // TODO(aleks, 07/14/16): unmount watcher when location changes
  // yield take(LOCATION_CHANGE);
  // yield cancel(watcher);
}

export default responseSaga;
