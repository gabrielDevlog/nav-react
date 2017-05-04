// Friends redux logic
import reducer from './reducer';
import initialState from './initialState';
import {fetch, cacheLoaded, reset, FRIENDSLIST_FETCH} from './actions';
import {fetchSaga} from './saga';

export default {
    initialState,
    reducer,
    reset,
    fetch,
    cacheLoaded,
    fetchSaga,
    FRIENDSLIST_FETCH,
};