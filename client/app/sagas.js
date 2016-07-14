import responseListSaga from './containers/ResponseList/sagas';

export default function* rootSaga() {
  yield [
    responseListSaga(),
  ];
}
