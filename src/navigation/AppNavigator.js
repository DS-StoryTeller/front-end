import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BookShelf from './BookShelf';
import BookRead from './BookRead';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="BookShelf">
      <Stack.Screen name="BookShelf" component={BookShelf} />
      <Stack.Screen name="BookRead" component={BookRead} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
