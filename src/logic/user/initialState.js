// initial state && objects formats
// @flow

import type {UserStateType} from './flow';

// default values
const initialState: UserStateType = {

    /**
     * user data
     * @type {Object}
     */
    user: {
        email: "",
        fbid: 0,
        iduser: 0,
        picture: "",
        pseudo: "",
        rang: "",
        token_connection: "",
        token_session: "",
        url: "",
    },

    /**
     * to know if state is waiting for data
     * @type Boolean
     */
    isFetching: false,

    /**
     * error data
     * @type {Object}
     */
    error: {
        show: false,
        msg: '',
    },

    /**
     * avatar url
     * @type {String}
     */
    image: '',

};

// export to default
export default initialState;