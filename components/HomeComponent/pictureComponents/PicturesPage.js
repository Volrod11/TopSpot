import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator(); // Stack contains Screen & Navigator properties

const PlaceholderImageR8 = require('../../../assets/images/r8.png');
const PlaceholderImageF150 = require('../../../assets/images/F150.png');
const PlaceholderImageLigier = require('../../../assets/images/ligier.png');
const PlaceholderImageSenna = require('../../../assets/images/senna.png');

export default function PicturesPage({  }) {
    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate("TestPage", {idImage : PlaceholderImageR8})} style={{height: 500, width: 350,}}>
                <ImageBackground  ImageViewer source={PlaceholderImageR8} resizeMode="cover" style={styles.picture}>
                    <View style={styles.footer}>
                        <Text style={styles.title}>Photo la plus partagée</Text>
                    </View>
                </ImageBackground>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("TestPage", {idImage : PlaceholderImageF150})} style={{height: 500, width: 350,}}>
                <ImageBackground  ImageViewer source={PlaceholderImageF150} resizeMode="cover" style={styles.picture}>
                    <View style={styles.footer}>
                        <Text style={styles.title}>Photo la plus partagée</Text>
                    </View>
                </ImageBackground>
            </Pressable>
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