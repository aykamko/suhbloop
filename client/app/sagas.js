import responseListSaga from '~/containers/ResponseList/sagas';
import responseSaga from '~/containers/Response/sagas';

export default function* rootSaga() {
  yield [
    responseListSaga(),
    responseSaga(),
  ];
}
