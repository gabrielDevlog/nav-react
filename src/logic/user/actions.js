// friends actions
import api from './api';

// Receiving data for user
export const USER_RECEIVE = "USER_RECEIVE";
export const receive = user => {
    return {type:USER_RECEIVE, user};
};

// Log out
export const USER_LOGOUT = "USER_LOGOUT";
export const logout = () => {
    return {type:USER_LOGOUT};
};

// toggle loading
export const USER_TOGGLE_LOADING = 'USER_TOGGLE_LOADING';
export const isFetching = isFetching => {
    return {type: USER_TOGGLE_LOADING, isFetching}
};

// set error msg
export const USER_ERROR = 'USER_ERROR';
export const error = (msg) => {
    return{ type:USER_ERROR, msg};
};

// loaded from cache
export const USER_CACHE_LOADED = 'USER_CACHE_LOADED';
export const cacheLoaded = state => {
    return {type: USER_CACHE_LOADED, state};
};

// generate image url
export const USER_SET_IMAGE = 'USER_SET_IMAGE';
export const setImage = image => {
    return { type: USER_SET_IMAGE, image};
};

// login action
export const USER_LOGIN = 'USER_LOGIN';
export const login = (email, pwd) => {
    return {type: USER_LOGIN, email, pwd};
};

// fblogin action
export const USER_FBLOGIN = 'USER_FBLOGIN';
export const fblogin = (success, data) => {
    return {type: USER_FBLOGIN, success, data};
};

// reset to initial state
export const USER_RESET = 'USER_RESET';
export const reset = () => {
    return {type:USER_RESET};
};