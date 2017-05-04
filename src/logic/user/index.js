// user redux logic
import reducer from './reducer';
import initialState from './initialState';
import {loginSaga, loginFbSaga} from './saga';
import {
    USER_LOGIN,
    USER_LOGOUT,
    USER_FBLOGIN,
    login,
    logout,
    reset,
    fblogin,
    cacheLoaded,} from './actions';

export default {
    initialState,
    reducer,
    login,
    logout,
    reset,
    fblogin,
    cacheLoaded,
    USER_LOGOUT,
    USER_LOGIN,
    USER_FBLOGIN,
    loginSaga,
    loginFbSaga,
};