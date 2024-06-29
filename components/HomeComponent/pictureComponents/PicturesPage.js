import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View, StyleSheet, Image, Pressable, ImageBackground, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator(); // Stack contains Screen & Navigator properties

const PlaceholderImageR8 = require('../../../assets/images/r8.png');
const PlaceholderImageF150 = require('../../../assets/images/F150.png');
const PlaceholderImageLigier = require('../../../assets/images/ligier.png');
const PlaceholderImageSenna = require('../../../assets/images/senna.png');

export default function PicturesPage({  }) {
    const navigation = useNavigation();
    return (
      <View style={styles.picturesPage}>
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
            <View style={styles.container}>
                <Pressable onPress={() => navigation.navigate("TestPage", {idImage : PlaceholderImageR8})} style={styles.bouton}>
                    <Image  ImageViewer source={PlaceholderImageR8} contentFit="cover" style={styles.image}/>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("TestPage", {idImage : PlaceholderImageF150})} style={styles.bouton}>
                    <Image  ImageViewer source={PlaceholderImageF150} contentFit="cover" style={styles.image}/>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("TestPage", {idImage : PlaceholderImageLigier})} style={styles.bouton}>
                    <Image  ImageViewer source={PlaceholderImageLigier} contentFit="cover" style={styles.image}/>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("TestPage", {idImage : PlaceholderImageSenna})} style={styles.bouton}>
                    <Image  ImageViewer source={PlaceholderImageSenna} contentFit="cover" style={styles.image}/>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("TestPage", {idImage : PlaceholderImageSenna})} style={styles.bouton}>
                    <Image  ImageViewer source={PlaceholderImageSenna} contentFit="cover" style={styles.image}/>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("TestPage", {idImage : PlaceholderImageSenna})} style={styles.bouton}>
                    <Image  ImageViewer source={PlaceholderImageSenna} contentFit="cover" style={styles.image}/>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("TestPage", {idImage : PlaceholderImageSenna})} style={styles.bouton}>
                    <Image  ImageViewer source={PlaceholderImageSenna} contentFit="cover" style={styles.image}/>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("TestPage", {idImage : PlaceholderImageSenna})} style={styles.bouton}>
                    <Image  ImageViewer source={PlaceholderImageSenna} contentFit="cover" style={styles.image}/>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("TestPage", {idImage : PlaceholderImageSenna})} style={styles.bouton}>
                    <Image  ImageViewer source={PlaceholderImageSenna} contentFit="cover" style={styles.image}/>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("TestPage", {idImage : PlaceholderImageSenna})} style={styles.bouton}>
                    <Image  ImageViewer source={PlaceholderImageSenna} contentFit="cover" style={styles.image}/>
                </Pressable>
            </View>
        </ScrollView>
        <StatusBar style="auto" />
      </View>
      
    );
}



const styles = StyleSheet.create({
  picturesPage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#0D0D0D",
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    backgroundColor: '#0D0D0D',
  },
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  bouton: {
    width: "32%",
    height: 200,
    margin: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 0,
  },
  
});