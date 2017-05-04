// @flow
import {createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga'
import navList from '../navList';
import friendsList from '../friends';
import user from '../user';
import app from '../app';

// initial state & store pattern
const initialState = {

    //historique des navigations
    navList: navList.initialState,

    // liste des amis
    friendsList: friendsList.initialState,

    // données de l'utilisateur
    user: user.initialState,

};

// main reducer
const rootReducer = combineReducers({
        navList: navList.reducer,
        friendsList: friendsList.reducer,
        user: user.reducer,
    }, initialState
);

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// create store
const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
);

// then run the saga
sagaMiddleware.run(app.appSaga);

///// DEBUG
console.log( JSON.parse(JSON.stringify(store.getState())));
store.subscribe( () => console.log(  JSON.parse(JSON.stringify(store.getState()))));
////

// export store
export default store;