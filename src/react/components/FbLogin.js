// COMPONENT : displaying facebook login button & logic
import React, {PropTypes} from 'react';
import {LoginButton, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';

class FbLogin extends React.Component {

    constructor(props) {
        super(props);

        // bind methods
        this.handleFbLogin = this.handleFbLogin.bind(this);
        this.handleFbLogout = this.handleFbLogout.bind(this);
    }

    // handle fb login
    handleFbLogin(error, result){

        // Error : no internet connection
        if( error == 'net::ERR_INTERNET_DISCONNECTED') {

            // continue loggin process with error
            this.props.loginHandler(false, "Pas de connection internet");

            // end process
            return null;
        }

        // Error : other
        if( error) {

            // continue loggin process with error
            this.props.loginHandler(false, "Une erreur est survenue.Vérifiez votre connection");

            // end process
            return null;
        }


        // retrieve access token
        AccessToken.getCurrentAccessToken()

         // import data from facebook
         .then( data => {

            // callback trigger login
            const responseInfoCallback = (error, result) => {

                // error handler
                if(error) {
                    this.props.loginHandler(false, 'Echec de l\'authentification');
                    return null;
                }

                // continue logging without error
                this.props.loginHandler(true, result);
            };

             // defining data to retrieve from fb
             const infoRequest = new GraphRequest(
                 '/me',
                 {
                     accessToken:  data.accessToken,
                     parameters: {
                         fields: {
                             string: 'email,name,id'
                         }
                     }
                 },
                 responseInfoCallback
             );

             // Trigger the graph request.
             new GraphRequestManager().addRequest(infoRequest).start();
         });

    }

    // handle fb logout
    handleFbLogout() {

        // continue logout process
        this.props.logoutHandler();
    }

    // render login screen
    render() {
        return (
            <LoginButton
                publishPermissions={["publish_actions"]}
                onLoginFinished={this.handleFbLogin}
                onLogoutFinished={this.handleFbLogout}
            />
        );
    }
}

// properties :
FbLogin.propTypes = {
    loginHandler: PropTypes.func,
    logoutHandler: PropTypes.func,
};


export default FbLogin;