// init script
import {AsyncStorage} from 'react-native';
import navList from '../navList';
import friendsList from '../friends';
import user from '../user';
import store from '../store';

// debug
console.log("init started");

// Load from localstorage
AsyncStorage.getItem('navweb_state')

// handle cached value
.then( json => {

    if(json){
        const loadedState = JSON.parse(json);

        if( loadedState.navList) {
            store.dispatch(navList.cacheLoaded(loadedState.navList));
        }

        if( loadedState.friendsList) {
            store.dispatch(friendsList.cacheLoaded(loadedState.friendsList));
        }

        if( loadedState.user) {
            store.dispatch(user.cacheLoaded(loadedState.user));
        }
    }
})

// add subscribers : save store to local storage
.then( () => {
    store.subscribe(() => {

        // get state to json
        const json = JSON.stringify( store.getState());

        // save
        AsyncStorage.setItem('navweb_state', json)

        // handle error
            .catch( e => {
                console.log("AsyncStorageError");
                console.log(error);
            });
    });
})

// load user's data
.then( () => {
    const iduser = store.getState().get('user').user.iduser;

    /*
    if( iduser > 0) {
        store.dispatch(navList.fetch(iduser));
    }
    */

})

// end of init sequence
.then( () => {

    console.log('init ended');
})

// handle errors
.catch( e => {
    console.log(e);
});

