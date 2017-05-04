// navlist saga
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import api from './api';
import {
    isFetching,
    receiveList,
    receiveTracks,
    receiveStarts
    } from './actions';

// fetch tracks datas
export function* fetchSaga(action){

    // toggle loading
    yield put(isFetching(true));

    try {
        // fetch navigations list (fetch library)
        const navigations = yield api.fetchList(action.iduser);

        // store navigations
        yield put(receiveList(navigations));

        // download gps data for the last 10 tracks
        const tracks = yield api.fetch10Tracks(action.iduser, navigations);

        // save tracks data to store
        yield put(receiveTracks(tracks));

        // extract starting points for those tracks
        const starts = yield api.extractStartingPoints(tracks);

        // save starts
        yield put(receiveStarts(starts));

        // hide loading
        yield put(isFetching(false));
    }
    catch(e) {
        console.log(e);

        // hide loading
        yield put(isFetching(false));
    }

};
