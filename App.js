import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './src/screens/Login';
import Signin from './src/screens/Signin';
import BookShelf from './src/screens/BookShelf';
import BookRead from './src/screens/BookRead';
import Quiz from './src/screens/Quiz';
import Profile from './src/screens/Profile';
import Question from './src/screens/Question'; 
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
   useEffect(() => {
      SplashScreen.hide();
    }, []);

  const BottomTabScreen = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: true,
          headerShown: false,
          tabBarStyle: {
            height: 30,
          },
        })}>
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Signin" component={Signin} />
        <Tab.Screen name="BookShelf" component={BookShelf} />
        <Tab.Screen name="BookRead" component={BookRead} />
        <Tab.Screen name="Quiz" component={Quiz} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  };

return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Bottom" component={BottomTabScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="BookShelf" component={BookShelf} />
            <Stack.Screen name="BookRead" component={BookRead} />
            <Stack.Screen name="Quiz" component={Quiz} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Question" component={Question} />
          </Stack.Navigator>
        </NavigationContainer>
      );
};

export default App;
