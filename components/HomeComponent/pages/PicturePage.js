import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator(); // Stack contains Screen & Navigator properties

const PlaceholderImage = require('../../../assets/images/r8.png');

export default function PicturePages({ route }) {
    const { idImage } = route.params;
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={idImage} style={styles.image} />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0D0D0D',
      alignItems: 'center',
    },
    imageContainer: {
      flex: 1,
      paddingTop: 70,
    },
    image: {
      width: 350,
      height: 440,
      borderRadius: 18,
    },
});