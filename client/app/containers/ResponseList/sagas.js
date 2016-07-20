import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';

import API from 'app/utils/API';

import { responsesListSuccess, responsesListFailure } from './index';

function* fetchResponseList() {
  try {
    const responseList = yield call(API.get, API.Constants.google.formResponses.index);
    yield put(responsesListSuccess(responseList));
  } catch (e) {
    yield put(responsesListFailure(e.message));
  }
}

function* responseListSaga() {
  yield fork(takeLatest, 'RESPONSE_LIST_REQUEST', fetchResponseList);

  // TODO(aleks, 07/14/16): unmount watcher when location changes
  // yield take(LOCATION_CHANGE);
  // yield cancel(watcher);
}

export default responseListSaga;
