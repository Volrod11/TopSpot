import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Session } from '@supabase/supabase-js'
import { useUser } from '../context/UserContext';


import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Screens
import GaragesScreen from './screens/GaragesScreen';
import CameraScreen from './screens/CameraScreen';
import MapScreen from './screens/MapScreen';
import ProfileScreenStack from './screens/ProfileScreen';
import CameraScreenNavigation from './navigations/CameraScreenNavigation';
import ProfileStackNavigator from './navigations/ProfileStackNavigator';
import HomeStackNavigator from './navigations/HomeStackNavigator';


//Screen names
const homeName = "Home";
const garageName = "Garage";
const cameraName = "Camera";
const mapName = "Map";
const profileName = "Profile";

const Tab = createBottomTabNavigator();

function MainContainer() {


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
                            size = 28;

                        } else if (rn === garageName) {
                            iconName = focused ? 'garage' : 'garage';
                            size = 28;

                        } else if (rn === cameraName) {
                            iconName = focused ? 'add-circle' : 'add-circle-outline';
                            size = 38;

                        } else if (rn === mapName) {
                            iconName = focused ? 'map' : 'map-outline';
                            size = 28;

                        } else if (rn === profileName) {
                            iconName = focused ? 'person' : 'person-outline';
                            size = 28;

                        }

                        // You can return any component that you like here!
                        if (iconName === "garage") {
                            return <MaterialCommunityIcons name={iconName} size={38} color={color} />
                        } else {
                            return <Ionicons name={iconName as any} size={size} color={color} />;
                        }

                    },
                    "tabBarActiveTintColor": "#ffe100",
                    "tabBarInactiveTintColor": "grey",
                    "tabBarStyle": {
                        backgroundColor: '#FFFFFF',
                        height: 85,
                        display: route.name === cameraName ? 'none' : 'flex',
                    },
                    "headerShown": false,
                    tabBarShowLabel: false,
                })}
            >

                <Tab.Screen name={homeName} component={HomeStackNavigator} />
                <Tab.Screen name={garageName} component={GaragesScreen} />
                <Tab.Screen name={cameraName} component={CameraScreenNavigation} />
                <Tab.Screen name={mapName} component={MapScreen} />
                <Tab.Screen name={profileName} component={ProfileStackNavigator} />


            </Tab.Navigator>
            <StatusBar
                style="dark"   // ← texte en NOIR
                backgroundColor="white"    // ← fond blanc sous l’heure
                translucent={false}        // ← force la couleur de fond
            />
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