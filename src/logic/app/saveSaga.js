// app's init saga
import { put, call } from 'redux-saga/effects';
import {AsyncStorage} from 'react-native';
import user from '../user';
import friends from '../friends';
import navList from '../navList';

export default function* initSaga(action){

    // debug
    console.log("init started");

    try {
        // Load from localstorage
        const json = yield AsyncStorage.getItem('navweb_state');
        
        // handle cached value
        if (json) {
            const loadedState = JSON.parse(json);

            if (loadedState.navList) {
                yield put(navList.cacheLoaded(loadedState.navList));
            }

            if (loadedState.friendsList) {
                yield put(friends.cacheLoaded(loadedState.friendsList));
            }

            if (loadedState.user) {
                yield put(user.cacheLoaded(loadedState.user));
            }
        }
/*
        // add subscribers : save store to local storage
        store.subscribe(() => {

            // get state to json
            const json = JSON.stringify(store.getState());

            // save
            AsyncStorage.setItem('navweb_state', json)

            // handle error
            .catch(e => {
                console.log("AsyncStorageError");
                console.log(e);
            });
        });
*/

        // end of init sequence
        console.log('init ended');
    }
    // handle errors
    catch(e){
        console.log(e);
    }

}
