import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import GaragesPage from '../HomeComponent/pages/GaragesPage';
import GaragePage from '../HomeComponent/pages/GaragePage';

import Garage from '../HomeComponent/components/GarageAncien';
import WeeklyPic from '../HomeComponent/components/WeeklyPic';
import SharedGarage from '../HomeComponent/components/SharedGarage';
import SharedPicture from '../HomeComponent/components/SharedPicture';
import FourPictures from '../HomeComponent/components/FourPictures';
import { FlatList } from 'react-native-gesture-handler';
import MiniGarageCard from '../GarageComponent/components/MiniGarageCard';
import { Ionicons } from '@expo/vector-icons';


const PlaceholderImage = require('../../assets/topspottitle.png');

const data = [
    {
        id: '1',
        user: { username: 'Alex_Cars', avatar: 'https://example.com/avatar1.jpg' },
        photos: [
            '../../assets/images/veyron.jpeg',
            '../../assets/images/sto.jpeg',
            '../../assets/images/svj.jpg',
            '../../assets/images/corvette.png',
        ],
        likes: 189,
        categoriesCount: 4,
    },
    {
        id: '2',
        user: { username: 'SpeedQueen', avatar: 'https://example.com/avatar2.jpg' },
        photos: [
            '../../assets/images/veyron.jpeg',
            '../../assets/images/sto.jpeg',
            '../../assets/images/svj.jpg',
            '../../assets/images/corvette.png',
        ],
        likes: 245,
        categoriesCount: 3,
    },
    // ajoute autant de cartes que tu veux
];


const GarageScreen = () => {
    return (
        <View>
            <View style={styles.header_container}>
                {/* Top Header */}
                <View style={styles.topHeader}>
                    <Text style={styles.garagesText}>Garages</Text>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Ionicons name="search" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <Ionicons name="funnel" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Bottom Section */}
                <View style={styles.bottomSection}>
                    <Text style={styles.garageDuMoisText}>Garage du Mois</Text>
                    <Text style={styles.dateText}>Janvier 2024</Text>
                </View>
            </View>

            <GaragesPage user_id={null}/>
            
        </View>
    );
};


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
            }} />

        </GarageStack.Navigator>
    );
}



const styles = StyleSheet.create({
    header_container: {
        padding: 16,
        paddingTop: 50,
        backgroundColor: '#fff', // Or your desired background color
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    topHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    garagesText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    iconContainer: {
        flexDirection: 'row',
    },
    iconButton: {
        padding: 8,
        borderRadius: 50,
        backgroundColor: '#f0f0f0',
        marginLeft: 8,
    },
    bottomSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    garageDuMoisText: {
        fontSize: 18,
        fontWeight: '600',
    },
    dateText: {
        fontSize: 16,
        color: '#666',
    },
    

});











