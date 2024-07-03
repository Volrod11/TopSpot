import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View, StyleSheet, Image, Pressable, ImageBackground, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import Garage from '../pictureComponents/Garage';

export default function GaragesPage({  }) {
    const navigation = useNavigation();
    return (
        <View style={styles.garagePage}>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    <Garage />
                    <Garage />
                    <Garage />
                    <Garage />
                    <Garage />
                </View>
            </ScrollView>
        </View>
      
    );
}



const styles = StyleSheet.create({
    garagePage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#0D0D0D",
    },
    scrollView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
});
