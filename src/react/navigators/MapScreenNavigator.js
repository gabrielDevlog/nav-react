/* Tab navigator for map screen */
import React from 'react';
import {StackNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import TestContent from '../containers/TestContent';
import NavListContent from '../containers/NavListContent';
import styles from '../style';

// tab navigator for screens
const MapTabNavigator = TabNavigator({
        Routes: {
            screen: NavListContent,
            navigationOptions: () => ({
                title: 'Routes',
            }),
        },
        Gps: {
            screen: TestContent,
            navigationOptions: () => ({
                title: 'Gps',
            }),
        },
    },{
        tabBarOptions: {
            activeTintColor: styles.colors.textPrimary,
            inactiveTintColor: styles.colors.textPrimary,
            style: {
                backgroundColor: styles.colors.primary,
            },
            indicatorStyle: {
                backgroundColor: styles.colors.accent,
            }
        },
    }
);

// Stack navigator on top
const MapStackNavigator = StackNavigator({
        Home: {
            screen: MapTabNavigator,
            navigationOptions: ({navigation}) => ({
                title: 'Accueil',
                headerLeft: (
                    <Icon.Button name="bars" backgroundColor="rgba(0,0,0,0)" onPress={() => navigation.navigate('DrawerOpen') }>
                    </Icon.Button>),
                headerStyle: {
                    backgroundColor: styles.colors.primary,
                    elevation: 0,       //remove shadow on Android
                    shadowOpacity: 0, // remove shadow on ios
                },
                headerTitleStyle: {
                    color: styles.colors.textPrimary,
                }
            }),
        },
    }
);

// export
export default MapStackNavigator;