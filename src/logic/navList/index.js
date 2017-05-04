import reducer from './reducer';
import {fetch, reset, cacheLoaded, NAVLIST_FETCH} from './actions';
import initialState from './initialState';
import {fetchSaga} from './saga';

export default {
    initialState,
    reducer,
    fetch,
    reset,
    cacheLoaded,
    fetchSaga,
    NAVLIST_FETCH,
};