import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PicturesStackNavigator from '../navigation/PicturesStackNavigator';

const Stack = createStackNavigator();

const ProfileStackNavigator = () => (
    <PicturesStackNavigator />
  );
export default ProfileStackNavigator;
