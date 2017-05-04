// friends actions
import api from './api';

// Receiving data for friends list
export const FRIENDSLIST_RECEIVE = "FRIENDSLIST_RECEIVE";
export const receive = friends => {
    return {type:FRIENDSLIST_RECEIVE, friends};
};

// toggle loading
export const FRIENDSLIST_TOGGLE_LOADING = 'FRIENDSLIST_TOGGLE_LOADING';
export const isFetching = isFetching => {
    return {type: FRIENDSLIST_TOGGLE_LOADING, isFetching}
};

// loaded from cache
export const FRIENDSLIST_CACHE_LOADED = 'FRIENDSLIST_CACHE_LOADED';
export const cacheLoaded = state => {
    return {type: FRIENDSLIST_CACHE_LOADED, state};
};

// fetching friends list
export const FRIENDSLIST_FETCH = 'FRIENDSLIST_FETCH';
export const fetch = iduser => {
    return {type:FRIENDSLIST_FETCH, iduser};
};

// reset to initial state
export const FRIENDSLIST_RESET = 'FRIENDSLIST_RESET';
export const reset = () => {
    return {type:FRIENDSLIST_RESET};
};
