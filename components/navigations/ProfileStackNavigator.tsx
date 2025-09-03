import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileScreenStackParamList } from "../../types";

import ProfileScreen from "../screens/ProfileScreen";
import Settings from "../pages/Settings";
import PicturesPageScreenStackNavigator from "./PicturesPageScreenStackNavigator";
import GaragesPageScreenStackNavigator from "./GaragesPageScreenStackNavigator";
import PicturePage from "../pages/PicturePage";
import GaragePage from "../pages/GaragePage";

const Stack = createStackNavigator<ProfileScreenStackParamList>();

const ProfileScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PicturePage"
        component={PicturePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GaragePage"
        component={GaragePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default ProfileScreenNavigator;
