// user saga
import { put } from 'redux-saga/effects';
import {isFetching,
    receive,
    setImage,
    error
    } from './actions';
import api from './api';

// login saga
export function* loginSaga(action){

    // toggle loading
    yield put(isFetching(true));

    try {
        // login request
        const user = yield api.login(action.email, action.pwd);

        // invalid user
        if(!user) {
            // toggle loading
            yield put(isFetching(false));

            return null;
        }

        // store user data in redux store
        yield put(receive(user));

        // generate user avatar url
        const imgPath = api.generateImgUrl(user);

        // save image to store
        yield put(setImage(imgPath));

        // toggle loading
        yield put(isFetching(false));

        // return data to chain sagas
        return user;
    }
    catch(e) {
        console.log(e);

        // show error
        yield put(error('Erreur de connection'));

        // toggle loading
        yield put(isFetching(false));

        // return data to chain sagas
        return null;
    }
}

// login via fb
export function* loginFbSaga(action){

    // handle login failure
    if( !action.success) {
        yield put(error(action.data));
        return null;
    }

    // toggle loading
    yield put(isFetching(true));

    // get infos
    const fbid = action.data.id;
    const name = action.data.name;
    const email = action.data.email || 'null';

    try {
        // validation du login par seame
        const user = yield api.validateFbLogin(fbid, name, email);

        // invalid user
        if( !user) {
            // toggle loading
            yield put(isFetching(false));

            return null;
        }

        // store user data in redux store
        yield put(receive(user));

        // generate user avatar url
        const imgPath = api.generateImgUrl(user);

        // save image to store
        yield put(setImage(imgPath));

        // toggle loading
        yield put(isFetching(false));

        // return data to chain saga
        return user;
    }
    // handle exception
    catch( e) {
        console.log(e);

        // show error
        yield put(error('Erreur lors de la validation du login par seame'));

        // toggle loading
        yield put(isFetching(false));

        // return data to chain sagas
        return null;
    }
}
