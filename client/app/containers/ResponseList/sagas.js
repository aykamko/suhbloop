import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';

import APIRequester from '../../utils/APIRequester';
import APIConstants from '../../constants/APIConstants';
import { responsesListSuccess, responsesListFailure } from './index';

function* fetchResponseList() {
  const responseList = yield call(
    APIRequester.get, APIConstants.google.formResponses.index
  );

  if (!responseList.err) {
    yield put(responsesListSuccess(responseList));
  } else {
    yield put(responsesListFailure(responseList.err));
  }
}

function* responseListSaga() {
  yield fork(takeLatest, 'RESPONSE_LIST_REQUEST', fetchResponseList);

  // TODO(aleks, 07/14/16): unmount watcher when location changes
  // yield take(LOCATION_CHANGE);
  // yield cancel(watcher);
}

export default responseListSaga;
