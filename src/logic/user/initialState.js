// initial state && objects formats
// @flow

// TODO : import UserStateType

// default values
export default {

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
