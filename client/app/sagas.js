import responseListSaga from 'app/containers/ResponseList/sagas';
import responseSaga from 'app/containers/Response/sagas';

export default function* rootSaga() {
  yield [
    responseListSaga(),
    responseSaga(),
  ];
}
