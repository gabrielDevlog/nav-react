// Screens : home
import React from 'react';
import {connect} from 'react-redux';
import user from '../../logic/user';
import {View, Text, Button, StatusBar} from 'react-native';
import styles from '../style';
import Loading from '../components/Loading.js';
import ErrorDisplay from '../components/ErrorDisplay.js';
import FormManager from '../components/FormManager.js';
import InputManager from '../components/InputManager.js';
import FbLogin from '../components/FbLogin.js';

class LoginContent extends React.Component {

    constructor(props) {
        super(props);

        // handle email & pwd value
        this.state = {
            email: '',
            pwd: '',
        };

        //bind methods to this
        this.handleSubmit = this.handleSubmit.bind(this);
        this.bindEmailValue = this.bindEmailValue.bind(this);
        this.bindPwdValue = this.bindPwdValue.bind(this);
        this.handleFbLogin = this.handleFbLogin.bind(this);
    }

    // bind email value
    bindEmailValue(value){
        this.setState({email: value});
    }

    // bind password value
    bindPwdValue(value) {
        this.setState({pwd: value});
    }

    // handle submit
    handleSubmit(){
        this.props.login(this.state.email, this.state.pwd);

        /*
        // toggle loading
        this.setState({loading: true});

        // get values
        email = this.state.email;
        pwd = this.state.pwd;

        // login request
        userApi.login(email, pwd)

        // handle response
        .then( data => {

            // store user data in redux store
            this.props.saveData(data);

            // toggle loading
            this.setState({loading: false});
        })

        // handle exception
        .catch( error => {
            console.log(error.message);

            // toggle loading & error
            this.setState({
                loading: false,
                errMsg: 'Erreur de connection'
            });
        });
        */
    }

    // handle fb login
    handleFbLogin(success, data){
        this.props.fblogin(success, data);
    }

    // render login screen
    render() {
        console.log('rending');
        return (
            <View>

                <StatusBar
                    backgroundColor={styles.statusBar.backgroundColor}
                    barStyle={styles.statusBar.style} />

                <Loading show={this.props.isFetching} />
                <ErrorDisplay msg={this.props.error.msg} />

                <FormManager>

                    <Text style={styles.loginForm.label}>Email</Text>

                    <InputManager
                        type="text"
                        name="email"
                        regexp={/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i}
                        errorMsg="mail non valide"
                        errorEvent="onBlur"
                        bindValue={this.bindEmailValue}
                        style={styles.loginForm.input}
                    />

                    <Text style={styles.loginForm.label}>Mot de passe</Text>

                    <InputManager
                        type="password"
                        name="pwd"
                        min={3}
                        errorMsg="Trop court"
                        errorEvent="onBlur"
                        bindValue={this.bindPwdValue}
                        style={styles.loginForm.input}
                    />

                    <Button
                        onPress={this.handleSubmit}
                        title="Connection"
                        color={styles.colors.primary}
                    />

                </FormManager>

                <FbLogin
                    loginHandler={this.handleFbLogin}
                />
            </View>
        );
    }
}

// connect data from store
const mapStateToProps = state => {
    return {
        isFetching: state.user.isFetching,
        error: state.user.error,
    };
};

// connect dispatch to store
const mapDispatchToProps = dispatch => {
    return {
        login: (email,pwd) => dispatch(user.login(email, pwd)),
        fblogin: (success, data) => dispatch(user.fblogin(success, data)),
    };
};

// connection du composant à redux
export default connect(mapStateToProps, mapDispatchToProps)(LoginContent);