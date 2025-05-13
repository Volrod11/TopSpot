import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Session } from '@supabase/supabase-js'
import ProfileScreenNavigator from './navigations/ProfileScreenNavigator';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Screens
import HomeStackScreen from './screens/HomeScreen';
import GarageScreen from './screens/GarageScreen';
import CameraScreen from './screens/CameraScreen';
import MapScreen from './screens/MapScreen';
import ProfileScreenStack from './screens/ProfileScreen';

//Screen names
const homeName = "Home";
const garageName = "Garage";
const cameraName = "Camera";
const mapName = "Map";
const profileName = "Profile";

const Tab = createBottomTabNavigator();

function MainContainer({ session }: { session: Session }) {
  return (
    <NavigationContainer>
        <Tab.Navigator 
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName: string | undefined = "";
                let rn = route.name;

                if (rn === homeName) {
                    iconName = focused ? 'home' : 'home-outline';
                    size = 30;

                } else if (rn === garageName) {
                    iconName = focused ? 'garage' : 'garage';
                    size = 30;

                } else if (rn === cameraName) {
                    iconName = focused ? 'add-circle' : 'add-circle-outline';
                    size = 50;

                } else if (rn === mapName) {
                    iconName = focused ? 'map' : 'map-outline';
                    size = 30;

                } else if (rn === profileName) {
                    iconName = focused ? 'person' : 'person-outline';
                    size = 30;

                }

                // You can return any component that you like here!
                if (iconName === "garage"){
                    return <MaterialCommunityIcons name={iconName} size={42} color={color} />
                } else {
                    return <Ionicons name={iconName} size={size} color={color} />;
                }
                
            },
            "tabBarActiveTintColor": "#ffe100",
            "tabBarInactiveTintColor": "grey",
            "tabBarStyle": {
                backgroundColor: '#000000',
                height: 110,
                display: route.name === cameraName ? 'none' : 'flex', },
            "headerShown": false,
            })}
            >

            <Tab.Screen name={homeName} component={HomeStackScreen}/>
            <Tab.Screen name={garageName} component={GarageScreen} />
            <Tab.Screen name={cameraName} component={CameraScreen} initialParams={{ user_id: session.user.id }}/>
            <Tab.Screen name={mapName} component={MapScreen} />
            <Tab.Screen name={profileName} component={ProfileScreenNavigator} initialParams={{ user_id: session.user.id }} />
            

        </Tab.Navigator>
        <StatusBar style = "light" />
    </NavigationContainer>
    
  );
}



const styles = StyleSheet.create({
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });



export default MainContainer;