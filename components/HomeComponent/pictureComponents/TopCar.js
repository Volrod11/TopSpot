import * as React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import TestPage from './TestPage';

const PlaceholderImage = require('../../../assets/images/r8.png');

export default function TopCar({ top }) {
    const navigation = useNavigation();
    title = "Top " + top;
    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate("TestPage", {idImage : PlaceholderImage} )} style={{height: "100%", width: "100%",}}>
                <ImageBackground  ImageViewer source={PlaceholderImage} resizeMode="cover" style={styles.picture}>
                    <View style={styles.footer}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </ImageBackground>
            </Pressable>
        </View>
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 300,
        width: 150,
        marginBottom: 30,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 15,
        overflow: 'hidden'
    },
    footer : {
        height : 60,
        width : "100%",
        backgroundColor : "rgba(0,0,0,0.42)",
        padding : "40px",
        position: "absolute",
        bottom: 0,
    },
    title : {
        color : "#fff",
        padding : 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    picture: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 40,
    }
});