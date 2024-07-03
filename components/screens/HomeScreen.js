import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PicturesPage from '../HomeComponent/pages/PicturesPage';
import TestPage from '../HomeComponent/pages/PicturePage';

import MonthlyGarage from '../HomeComponent/pictureComponents/MonthlyGarage';
import WeeklyPic from './../HomeComponent/pictureComponents/WeeklyPic';
import SharedGarage from './../HomeComponent/pictureComponents/SharedGarage';
import SharedPicture from './../HomeComponent/pictureComponents/SharedPicture';
import FourPictures from './../HomeComponent/pictureComponents/FourPictures';


const PlaceholderImage = require('../../assets/topspottitle.png');

function HomeScreen({ navigation }) {
    return (
        <View style={styles.homePage}>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                <Image style={styles.topspotTitle} source={PlaceholderImage}/>
                <WeeklyPic />
                <MonthlyGarage />
                <SharedGarage />
                <FourPictures />
                <SharedPicture />
            </ScrollView>
        </View>
    );
}


const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{
        headerShown: false
    }} >
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="PicturesPage" component={PicturesPage} options={{
        headerShown: true,
        headerBackTitle: 'Back',
        headerStyle: {
            backgroundColor: '#000000',
        },
        headerTitleStyle: {
            color: '#fff',
        },
        }}/>
      <HomeStack.Screen name="TestPage" component={TestPage} options={{
        headerShown: true,
        headerBackTitle: 'Back',
        headerStyle: {
            backgroundColor: '#000000',
        },
        headerTitleStyle: {
            color: '#fff',
        },
        }}/>

    </HomeStack.Navigator>
  );
}




const styles = StyleSheet.create({
    homePage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#0D0D0D",
    },
    text: { 
        fontSize: 26,
        fontWeight: 'bold',
        color: "#fff",
    }, 
    topspotTitle: {
        width: 250,
        height: 80,
        marginTop: 20,
    }, 
    scrollView: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});