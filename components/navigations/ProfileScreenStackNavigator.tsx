// Screen2StackNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../types'; // Assurez-vous de définir Screen2StackParamList dans types.ts
import PicturePage from '../HomeComponent/pages/PicturePage';
import PicturesPage from '../HomeComponent/pages/PicturesPage';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator<RootStackParamList>();

const ProfileScreenStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>      
        <Stack.Screen name="PicturesPage" component={PicturesPage} />
        <Stack.Screen name="PicturePage" component={PicturePage} />
    </Stack.Navigator>
  );
};

export default ProfileScreenStackNavigator;
