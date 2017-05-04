// API : user tools
import conf from '../conf';

export default {

    /**
     * direct login method
     * @param email String
     * @param password String
     * @returns {Promise.<U>|Promise.<TResult>}
     */
    login: (email, password) => {

        // url
        let url = conf.serverUrl+'user.php';
        url += '?mode=login';
        url += '&email='+email;
        url += '&mdp='+password;

        // fetch from url
        return fetch(url)

        // convert response to json
        .then(response => response.json())

        // handle server response
        .then(response => {

                // Server error
                if (response.answer_code != 'login_end_code_0') {
                    throw Error(response.answer_code);
                }

                // return data
                return response.answer_data;
            });
    },

    /**
     * ask seame api to validate fb login
     * @param fbid Integer
     * @param name String
     * @param email String
     * @returns {Promise.<U>|Promise.<TResult>}
     */
    validateFbLogin: (fbid, name, email) => {

        // url
        url= conf.serverUrl + 'user.php';
        url+= "?mode=validateFbLogin";
        url+= '&fbid='+fbid;
        url+= '&name='+name;
        url+= '&email='+email;

        // requête http pour login
        return fetch(url)

        // convert response to json
        .then(response => response.json())

        // succès de la requête
        .then(reponse => {

            // Récupération du code de réponse et des données
            const reponse_code= reponse['answer_code'];
            const reponse_data= reponse['answer_data'];

            // utilisateur connecté correctement
            if( "validateFbLogin_end_code_0" == reponse_code) {

                // promesse résolue
                return reponse_data;
            }
            // erreur serveur
            else {
                throw new Error(reponse_code)
            }

        });
    },

    /**
     * generate image url from user data
     * @param user {Object<user>}
     * @returns String
     */
    generateImgUrl: user => {

        // invalid data
        if(!user) {
            return '';
        }

        // image from fb
        if( user.fbid > 0) {
            return `https://graph.facebook.com/${user.fbid}/picture?type=large`;
        }

        // image from seame
        else {
            return `${conf.imageUrl}${user.picture}`;
        }
    },
};