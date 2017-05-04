// app's logout saga
import { put } from 'redux-saga/effects';
import user from '../user';
import friends from '../friends';
import navList from '../navList';

export default function* logoutSaga(action){

    // reinit state for user
    yield put(user.reset());

    // reinit state for friends
    yield put(friends.reset());

    // reinit state for navlist
    yield put(navList.reset());
}
