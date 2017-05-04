/*
    Flow's type definitions for user logic module
    @flow
 */

// flow type for actions
export type ActionType = {
    type: string,
};

// flow type for user data
export type UserDataType = {
    email: string,
    fbid: number,
    iduser: number,
    picture: string,
    pseudo: string,
    rang: string,
    token_connection: string,
    token_session: string,
    url: string,
};

// flow type for fetching data
export type UserIsFetchingType = boolean;

// flow type for user error
export type UserErrorType = {
    show: boolean,
    msg: string,
};

// flow type for user image
export type UserImageType = string;

// flow type for user state
export type UserStateType = {

    user: UserDataType,

    /**
     * to know if state is waiting for data
     * @type Boolean
     */
        isFetching: UserIsFetchingType,

    /**
     * error data
     * @type {Object}
     */
        error: UserErrorType,

    /**
     * avatar url
     * @type {String}
     */
        image: UserImageType,

};

