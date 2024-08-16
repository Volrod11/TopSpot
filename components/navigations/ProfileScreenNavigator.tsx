import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreenStackParamList } from '../../types';

import ProfileScreen from '../screens/ProfileScreen';
import PicturePage from '../HomeComponent/pages/PicturePage';
import GaragePage from '../HomeComponent/pages/GaragePage';
import Settings from '../HomeComponent/pages/Settings';

const ProfileScreenStack = createStackNavigator<ProfileScreenStackParamList>();



const ProfileScreenNavigator = ({ route }) => {
    const { user_id } = route.params;
    return (
      <ProfileScreenStack.Navigator>
        <ProfileScreenStack.Screen name="ProfileScreen" component={ProfileScreen} initialParams={{ user_id }} options={{ headerShown: false }} />
        <ProfileScreenStack.Screen name="PicturePage" component={PicturePage} />
        <ProfileScreenStack.Screen name="GaragePage" component={GaragePage} />
        <ProfileScreenStack.Screen name="Settings" component={Settings} />
      </ProfileScreenStack.Navigator>
    );
};

export default ProfileScreenNavigator;
  