// App styles
import {StyleSheet} from 'react-native';

// color chart
const colors = {
    primary: '#038071',
    secondary: '#2d807e',
    accent: "#ff911e",
    textPrimary: '#FFF',
};

// status bar
const statusBar = {
    backgroundColor: colors.primary,
    style: 'light-content'
};

// login form style
const loginForm = {
    label: {
        flexDirection: 'row',
        textAlign: 'center',
        fontSize: 22,
    },
    input: {
        flexDirection: 'row',
        fontSize: 20,
    }
};

// map container
const mapContainer = {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
};

// map renderer
const mapRenderer = {
    ...StyleSheet.absoluteFillObject,
};

//style
export default {
    colors,
    statusBar,
    loginForm,
    mapContainer,
    mapRenderer,
};