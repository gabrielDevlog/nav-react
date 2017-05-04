// nav list actions
import api from './api';

// Receiving navigation list data
export const NAVLIST_RECEIVE_LIST = 'NAVLIST_RECEIVE_LIST';
export const receiveList = navigations => {
    return {type: NAVLIST_RECEIVE_LIST, navigations};
};

// Receiving navigation gps data for several tracks
export const NAVLIST_RECEIVE_TRACKS = 'NAVLIST_RECEIVE_TRACKS';
export const receiveTracks = tracks => {
	return {type: NAVLIST_RECEIVE_TRACKS, tracks};
};

// Adding starting points for several tracks
export const NAVLIST_ADD_STARTS = 'NAVLIST_ADD_STARTS';
export const receiveStarts = starts => {
    return {type: NAVLIST_ADD_STARTS, starts};
};

// toggle loading
export const NAVLIST_TOGGLE_LOADING = 'NAVLIST_TOGGLE_LOADING';
export const isFetching = isFetching => {
    return {type: NAVLIST_TOGGLE_LOADING, isFetching}
};

// loaded from cache
export const NAVLIST_CACHE_LOADED = 'NAVLIST_CACHE_LOADED';
export const cacheLoaded = state => {
    return {type: NAVLIST_CACHE_LOADED, state};
};

// fetch tracks datas (async wit redux-thunk)
export const NAVLIST_FETCH = 'NAVLIST_FETCH';
export const fetch = iduser => {
    return {type:NAVLIST_FETCH, iduser};
};

// reset to initial state
export const NAVLIST_RESET = 'NAVLIST_RESET';
export const reset = () => {
    return {type: NAVLIST_RESET};
};