// reducer for navList
import _ from 'lodash';
import {
    NAVLIST_RECEIVE_LIST,
    NAVLIST_RECEIVE_TRACKS,
    NAVLIST_ADD_STARTS,
    NAVLIST_TOGGLE_LOADING,
    NAVLIST_RESET,
    NAVLIST_CACHE_LOADED} from './actions';
import initialState from './initialState';

export default reducer = (state = initialState, action) => {

    switch (action.type) {

        case NAVLIST_RECEIVE_LIST:
            return {
                ...state,
                navigations: Object.assign({},action.navigations),
            };

        case NAVLIST_RESET:
            return Object.assign({}, initialState);

        case NAVLIST_RECEIVE_TRACKS:
            return {
                ...state,
                tracks: _.uniqWith([
                    ...state.tracks,
                    ...action.tracks,
                ], _.isEqual)
            };

        case NAVLIST_ADD_STARTS:
            return {
                ...state,
                starts:  _.uniqWith([
                    ...state.starts,
                    ...action.starts,
                ], _.isEqual)
            };

        case NAVLIST_CACHE_LOADED:
            return Object.assign({}, initialState ,{...action.state});

        case NAVLIST_TOGGLE_LOADING:
            return Object.assign({}, state, {isFetching: action.isFetching});

        default:
            return state;
    }
}
