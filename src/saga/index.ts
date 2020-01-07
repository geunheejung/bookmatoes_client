import { all, fork } from 'redux-saga/effects';
import bookSaga from './book';

function* mainSaga () {
  yield all([...bookSaga].map(saga => fork(saga)))
}

export default mainSaga;