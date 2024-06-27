import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeStackScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import AddScreen from './screens/AddScreen';
import MapScreen from './screens/MapScreen';
import ProfileScreen from './screens/ProfileScreen';

//Screen names
const homeName = "Home";
const searchName = "Search";
const addName = "Add";
const mapName = "Map";
const ProfileName = "Profile";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
        <Tab.Navigator 
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;

                if (rn === homeName) {
                    iconName = focused ? 'home' : 'home-outline';
                    size = 30;

                } else if (rn === searchName) {
                    iconName = focused ? 'search' : 'search-outline';
                    size = 30;

                } else if (rn === addName) {
                    iconName = focused ? 'add-circle' : 'add-circle-outline';
                    size = 50;

                } else if (rn === mapName) {
                    iconName = focused ? 'map' : 'map-outline';
                    size = 30;

                } else if (rn === ProfileName) {
                    iconName = focused ? 'person' : 'person-outline';
                    size = 30;

                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            "tabBarActiveTintColor": "#ffe100",
            "tabBarInactiveTintColor": "grey",
            "tabBarStyle": { backgroundColor: '#000000', height: 110 },
            "headerShown": false,
            })}
            >

            <Tab.Screen name={homeName} component={HomeStackScreen}/>
            <Tab.Screen name={searchName} component={SearchScreen} />
            <Tab.Screen name={addName} component={AddScreen} />
            <Tab.Screen name={mapName} component={MapScreen} />
            <Tab.Screen name={ProfileName} component={ProfileScreen} />

        </Tab.Navigator>
        <StatusBar style = "light" />
    </NavigationContainer>
    
  );
}







export default MainContainer;