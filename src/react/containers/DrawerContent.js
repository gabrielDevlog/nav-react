// Drawer controller
import React from 'react';
import {connect} from 'react-redux';
import {Button, Text, Image, View} from 'react-native';
import { DrawerView } from 'react-navigation';

class DrawerContent extends React.Component {

    constructor(props){
        super(props);

        // bind methods
        this.renderImage = this.renderImage.bind(this);
    }

    renderImage(){

        // no image
        if(!this.props.data.image || this.props.data.image == ''){
            return null;
        }

        return <Image
            source={ {uri:this.props.data.image} }
            style={{width: 100, height: 100}}
        />
    }

    render(){

        // render login button
        if( this.props.data.user.iduser == 0){
            return (
                <View>
                    <Button
                        title="Connexion"
                        onPress={() => {this.props.navigation.navigate('Login');}}
                    />
                    <DrawerView.Items {...this.props} />
                </View>
            );
        }

        // render User img & pseudo
        return(

            <View>
                {this.renderImage()}
                <Text>{this.props.data.user.pseudo}</Text>
                <DrawerView.Items {...this.props} />
            </View>
        );
    }
}

// connect data from store
const mapStateToProps = state => {
    return {
        data: state.user,
    };
};

// connect dispatch to store
const mapDispatchToProps = dispatch => {
    return {

    };
};

// connection du composant à redux
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);

