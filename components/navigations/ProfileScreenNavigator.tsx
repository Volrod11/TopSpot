import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import PicturePage from '../HomeComponent/pages/PicturePage';
import { RootStackParamList2, ProfileScreenStackParamList } from '../../types';

const RootStack = createStackNavigator<RootStackParamList2>();
const ProfileScreenStack = createStackNavigator<ProfileScreenStackParamList>();



const ProfileScreenNavigator = ({ route }) => {
    const { user_id } = route.params;
    return (
      <ProfileScreenStack.Navigator>
        <ProfileScreenStack.Screen name="ProfileScreen" component={ProfileScreen} initialParams={{ user_id }} options={{ headerShown: false }} />
        <ProfileScreenStack.Screen name="PicturePage" component={PicturePage} />
      </ProfileScreenStack.Navigator>
    );
};

export default ProfileScreenNavigator;
  