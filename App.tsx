import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/views/home';
import {store} from './src/redux/store';
import QuizzesMenu from './src/views/quizzesMenu';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
    return (
        <Provider store={store}>
            <StatusBar barStyle="dark-content"/>
            <NavigationContainer>
                <StackMenu/>
            </NavigationContainer>
        </Provider>
    );
};

const StackMenu = () => {
    return <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen
            name="Home"
            options={{title: 'Home'}}
            component={Home}/>
        <Stack.Screen name="QuizzesMenu" component={QuizzesMenu}/>
    </Stack.Navigator>
}

const DrawersMenu = () => {
    return <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
            name="Home"
            options={{title: 'Home'}}
            component={Home}/>
        <Drawer.Screen name="QuizzesMenu" component={QuizzesMenu}/>
    </Drawer.Navigator>
}

export default App;
