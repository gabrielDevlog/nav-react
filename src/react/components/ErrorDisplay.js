import React, {PropTypes} from 'react';
import {Text} from 'react-native';

// Component : render an error displayer
const ErrorDisplay = ({msg}) => {

    if( msg.length > 0) {
        return (
            <Text>
                {msg}
            </Text>
        );
    }

    return null;
};

// Required properties
ErrorDisplay.propTypes = {
    msg: PropTypes.string.isRequired
};

export default ErrorDisplay;
