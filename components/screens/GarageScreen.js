import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import GaragesPage from '../HomeComponent/pages/GaragesPage';
import GaragePage from '../HomeComponent/pages/GaragePage';

import Garage from '../HomeComponent/pictureComponents/Garage';
import WeeklyPic from './../HomeComponent/pictureComponents/WeeklyPic';
import SharedGarage from './../HomeComponent/pictureComponents/SharedGarage';
import SharedPicture from './../HomeComponent/pictureComponents/SharedPicture';
import FourPictures from './../HomeComponent/pictureComponents/FourPictures';


const PlaceholderImage = require('../../assets/topspottitle.png');

function GarageScreen({ navigation }) {
    return (
        <View style={styles.garagePage}>
            <GaragesPage />
        </View>
    );
}


const GarageStack = createNativeStackNavigator();

export default function GarageStackScreen() {
  return (
    <GarageStack.Navigator screenOptions={{
        headerShown: false
    }} >
      <GarageStack.Screen name="GarageScreen" component={GarageScreen} />
      <GarageStack.Screen name="GaragePage" component={GaragePage} options={{
        headerShown: true,
        headerBackTitle: 'Back',
        headerStyle: {
            backgroundColor: '#000000',
        },
        headerTitleStyle: {
            color: '#fff',
        },
        }}/>

    </GarageStack.Navigator>
  );
}



const styles = StyleSheet.create({
    garagePage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#0D0D0D",
        paddingTop: 70,
    },
});











