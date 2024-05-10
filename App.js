import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import Signin from './src/screens/Signin';
import BookShelf from './src/screens/BookShelf';
import BookRead from './src/screens/BookRead';
import Quiz from './src/screens/Quiz';
import Profile from './src/screens/Profile';

const App = () => {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="BookShelf" component={BookShelf} />
            <Stack.Screen name="BookRead" component={BookRead} />
            <Stack.Screen name="Quiz" component={Quiz} />
            <Stack.Screen name="Profile" component={Profile} />
          </Stack.Navigator>
        </NavigationContainer>
      );

};
export default App;
