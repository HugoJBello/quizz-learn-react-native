import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/views/home';
import {store} from './src/redux/store';
import LecturesMenu from './src/views/lecturesMenu';
import {ThemeProvider} from 'react-native-elements';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {I18nextProvider} from 'react-i18next';
import {i18n} from "./i18n";
import Lecture from "./src/views/lecture";
import Startup from "./src/components/startup";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
    let colorScheme = useColorScheme();

    return (
        <I18nextProvider i18n={i18n}>
            <SafeAreaProvider>
                <Provider store={store}>
                    <ThemeProvider theme={theme}>
                        <StatusBar barStyle="dark-content"/>
                        <Startup/>
                        <AppearanceProvider>
                            <NavigationContainer>
                                <StackMenu/>
                            </NavigationContainer>
                        </AppearanceProvider>
                    </ThemeProvider>
                </Provider>
            </SafeAreaProvider>
        </I18nextProvider>
    );
};

const theme = {
    Button: {
        titleStyle: {
            //color: 'red',
        },
    },
};

const StackMenu = () => {
    return <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }}>
        <Stack.Screen
            name="Home"
            options={{title: 'Home'}}
            component={Home}/>
        <Stack.Screen
            name="LecturesMenu"
            options={{title: 'Lectures and quizzes'}}
            component={LecturesMenu}/>
        <Stack.Screen
            name="Lecture"
            options={{title: 'Lecture'}}
            component={Lecture}/>
    </Stack.Navigator>
}

export default App;
