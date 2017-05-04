// friends saga
import { put } from 'redux-saga/effects';
import {isFetching,
    receive,
} from './actions';
import api from './api';

export function* fetchSaga(action) {

    // toggle loading
    yield put(isFetching(true));

    try {
        // fetch friends list (fetch library)
        const friends = yield api.fetch(action.iduser);

        // store friends in state
        yield put(receive(friends));

        // hide loading
        yield put(isFetching(false));
    }
    catch(e){
        console.log(e);

        // hide loading
        yield put(isFetching(false));
    }
}
