// app's facebook login saga
import { put } from 'redux-saga/effects';
import user from '../user';
import friends from '../friends';
import navList from '../navList';

export default function* fbLoginSaga(action){

    // execute login
    const userData = yield user.loginFbSaga(action);

    // invalid user
    if(!userData) {
        return null;
    }

    // fetch friends
    yield friends.fetchSaga(friends.fetch(userData.id_user));

    // fetch navigations
    yield navList.fetchSaga(navList.fetch(userData.id_user));
}
