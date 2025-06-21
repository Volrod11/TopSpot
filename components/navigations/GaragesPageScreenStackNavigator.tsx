import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GaragesPage from '../HomeComponent/pages/GaragesPage';
import GaragePage from '../HomeComponent/pages/GaragePage'; 

const Stack = createStackNavigator();

const GaragesPageScreenStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="GaragesPage" component={GaragesPage} />
      <Stack.Screen name="GaragePage" component={GaragePage} />
    </Stack.Navigator>
  );
};

export default GaragesPageScreenStackNavigator;