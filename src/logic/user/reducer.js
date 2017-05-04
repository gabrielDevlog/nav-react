// reducer for friends
import {
    USER_RECEIVE,
    USER_LOGOUT,
    USER_RESET,
    USER_CACHE_LOADED,
    USER_TOGGLE_LOADING,
    USER_ERROR,
    USER_SET_IMAGE} from './actions';
import initialState from './initialState';

export default reducer = (state = initialState, action) => {

    switch (action.type){

        case USER_RECEIVE:
            return Object.assign({}, state, {
                user: {
                    ...action.user,
                    iduser: action.user.id_user,
                }
            });

        case USER_LOGOUT:
        case USER_RESET:
            return Object.assign({}, initialState);

        case USER_SET_IMAGE:
            return Object.assign({}, state, {
                image: action.image
            });

        case USER_CACHE_LOADED:
            return Object.assign({}, initialState ,{...action.state});

        case USER_TOGGLE_LOADING:
            return Object.assign({}, state, {isFetching: action.isFetching});

        case USER_ERROR:
            return Object.assign({}, state, {
                error: {
                    show: true,
                    msg: action.msg,
                }
            });

        default:
            return state;
    }
}
