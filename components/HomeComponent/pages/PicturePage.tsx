import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../types';

type PicturePageRouteProp = RouteProp<RootStackParamList, 'PicturePage'>;

type Props = {
  route: PicturePageRouteProp;
};


const PicturePage: React.FC<Props> = ({ route }) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image src={route.params.idImage} style={styles.image} />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}


export default PicturePage;

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