import * as React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import TopCar from './TopCar';

const PlaceholderImage = require('../../../assets/images/r8.png');

export default function Garage() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TopCar top={"Audi"}/>
                <TopCar top={"Navarrenx"}/>
            </View>
            <View style={styles.row}>
                <TopCar top={"Black"}/>
                <TopCar top={"R8"}/>
            </View>
        </View>
    );
}




const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    container: {
        flex: 1,
        height: 625,
        width: 360,
        marginBottom: 50,
        borderRadius: 15,
        overflow: 'hidden'
    },
    footer : {
        height : 90,
        width : "100%",
        backgroundColor : "rgba(0,0,0,0.42)",
        padding : "40px",
        position: "absolute",
        bottom: 0,
    },
    title : {
        color : "#fff",
        padding : 10,
        fontSize: 26,
        fontWeight: 'bold',
    },
    picture: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 40,
    }
});