// reducer for friends
import {
    FRIENDSLIST_RECEIVE,
    FRIENDSLIST_TOGGLE_LOADING,
    FRIENDSLIST_RESET,
    FRIENDSLIST_CACHE_LOADED} from './actions';
import initialState from './initialState';

export default reducer = (state = initialState, action) => {

    switch (action.type){

        case FRIENDSLIST_RECEIVE:
            return {
                ...state,
                friends: action.friends
            };

            case FRIENDSLIST_CACHE_LOADED:
            return Object.assign({}, initialState ,{...action.state});

        case FRIENDSLIST_RESET:
            return Object.assign({}, initialState);

        case FRIENDSLIST_TOGGLE_LOADING:
            return Object.assign({}, state, {isFetching: action.isFetching});
        default:
            return state;
    }
}
