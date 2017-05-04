// COMPONENT : displaying loading spinner
import React, {PropTypes} from 'react';
import {Text} from 'react-native';

let Loading = ({show}) => {

    if( show) {
        return (<Text>Chargement...</Text>);
    }
    else {
        return null;
    }

};

// required :
Loading.propTypes = {
    show: PropTypes.bool.isRequired
};


export default Loading;