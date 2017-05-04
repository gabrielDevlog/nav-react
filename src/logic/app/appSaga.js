// app main saga
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import user from '../user';
import friends from '../friends';
import navList from '../navList';
import loginSaga from './loginSaga';
import fbLoginSaga from './fbLoginSaga';
import logoutSaga from './logoutSaga';
import initSaga from './initSaga';

export default function* appSaga() {

    // init sequence
    yield initSaga();

    // user login
    yield takeEvery(user.USER_LOGIN, loginSaga);

    // user fblogin
    yield takeEvery(user.USER_FBLOGIN, fbLoginSaga);

    // user logout
    yield takeEvery(user.USER_LOGOUT, logoutSaga);

    // friends list fetching
    yield takeEvery(friends.FRIENDSLIST_FETCH, friends.fetchSaga);

    // navigation list fetching
    yield takeEvery(navList.NAVLIST_FETCH, navList.fetchSaga);
}
