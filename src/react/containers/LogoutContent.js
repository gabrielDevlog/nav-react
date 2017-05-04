// Screen : render a logout button & logic
import React from 'react';
import {Button, Text, View} from 'react-native';
import {connect} from 'react-redux';
import user from '../../logic/user';
import FbLogin from '../components/FbLogin';

class LogoutContent extends React.Component {

    constructor(props) {
        super(props);

        // message
        this.state = {
            msg: ''
        };

        //bind methods to this
        this.handleLogout = this.handleLogout.bind(this);
        this.renderMsg = this.renderMsg.bind(this);
    }

    // handle click event
    handleLogout() {

        // dispatch logout
        this.props.logout();

        // message
        this.setState({msg:'Vous avez été déconnecté'});
    }

    // conditionnal rendering for message
    renderMsg(){
        if(this.state.msg != '') {
            return <Text>{this.state.msg}</Text>;
        }

        return null;
    }

    // render a logout button
    render(){

        return (
            <View>
                {this.renderMsg()}
                <Button
                    title="déconnection"
                    onPress={this.handleLogout}
                />
                <FbLogin
                    logoutHandler={this.handleLogout}
                />
            </View>
        );
    }
}

// connect data from store
const mapStateToProps = state => {
    return {};
};

// connect dispatch to store
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(user.logout())
    };
};

// connection du composant à redux
export default connect(mapStateToProps, mapDispatchToProps)(LogoutContent);
