/* App navigator */
import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import MapScreenNavigator from './MapScreenNavigator';
import TestContent from '../containers/TestContent';
import LoginContent from '../containers/LoginContent';
import LogoutContent from '../containers/LogoutContent';
import DrawerContent from '../containers/DrawerContent';

const AppNavigator = DrawerNavigator({

        Home: {
            screen: MapScreenNavigator,
            navigationOptions: () => ({
                title: 'Home',
            }),
        },
        Friends: {
            screen: TestContent,
            navigationOptions: () => ({
                title: 'Friends',
            }),
        },
        Login: {
            screen: LoginContent,
        },
        Logout: {
            screen: LogoutContent,
        },
    }, {
        contentComponent: DrawerContent,
});

/*

 <Router>
 <NavCtrl />
 <Route path="/home" component={LoginCtrl}/>
 <Route path="/routes/:idUser" component={NavList} />
 <Route path="/cercle/:idUser" component={FriendsList}/>
 <Route path="/logout" component={LogoutCtrl}/>
 <Route path="/map/:idRoute" component={MapCtrl} />
 </Router>
 */

export default AppNavigator;