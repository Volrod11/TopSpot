import * as React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

import TestPage from '../pages/PicturePage';


export default function MonthlyGarage() {
    const navigation = useNavigation();
    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../../assets/images/corvette.png')}
                    style={styles.image}
                />
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>🏆 Leader</Text>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.userRow}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/100?img=10' }}
                        style={styles.avatar}
                    />
                    <View>
                        <Text style={styles.username}>@CarHunter92</Text>
                        <Text style={styles.categoryInfo}>4/4 catégories</Text>
                    </View>
                </View>

                <View style={styles.likesRow}>
                    <Ionicons name="heart" size={20} color="#ff4d4d" />
                    <Text style={styles.likesText}>1.2k</Text>
                </View>
            </View>
        </View>
    );
}




const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        backgroundColor: '#fff',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 200,
        alignSelf: 'stretch', // Forces the image to stretch
    },
    badge: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#FFD700',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    badgeText: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#000',
    },
    infoContainer: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    username: {
        fontWeight: '600',
        fontSize: 14,
    },
    categoryInfo: {
        color: '#666',
        fontSize: 12,
    },
    likesRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    likesText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#ff4d4d',
    },
});