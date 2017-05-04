import React from 'react';
import store from './logic/store';
import {Provider} from 'react-redux';
import {AppRegistry } from 'react-native';
import AppNavigator from './react/navigators/AppNavigator.js';

// merging Redux store & App
export default class navnativebase extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppNavigator onNavigationStateChange={null}/>
            </Provider>
        );
    }
};

AppRegistry.registerComponent('navnativebase', () => navnativebase);
