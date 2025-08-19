import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';

import PicturesPage from '../pages/PicturesPage';
import PicturePage from '../pages/PicturePage';
import TestPage from '../pages/PicturePage';

import MonthlyGarage from '../HomeComponent/components/MonthlyGarage';
import WeeklyPic from '../HomeComponent/components/WeeklyPic';
import SharedGarage from '../HomeComponent/components/SharedGarage';
import SharedPicture from '../HomeComponent/components/SharedPicture';
import FourPictures from '../HomeComponent/components/FourPictures';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import CardSection from '../HomeComponent/components/CardSection';
import NearbyEvent from '../HomeComponent/components/NearbyEvent';
import Garage from '../HomeComponent/components/Garage';
import LastsSpots from '../HomeComponent/components/LastsSpots';
import Picture from '../HomeComponent/components/Picture';
import SuggestedProfiles from '../HomeComponent/components/SuggestedProfiles';
import { supabase } from '../../lib/supabase';

/*


                <CardSection title="Photos" style={{shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6,}} titleStyle={undefined}>
                    <PicturesByCategories />
                </CardSection>
*/


const PlaceholderImage = require('../../assets/topspottitle.png');


type HomepageContent = {
    id: string;
    type: 'garage' | 'picture' | 'event';
    title: string;
    filters: JSON;
}



const fetchHomepageContents = async () => {
    const {data, error } = await supabase
    .rpc('get_random_sections', { per_type: 3 });
    if (error) {
        console.error('Error fetching homepage contents:', error);
        return [];
    }

    return data as HomepageContent[];
}


function HomeScreen() {
    return (
        <View style={styles.homePage}>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>

                <LinearGradient
                    colors={['#667DE9', '#764DA4']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.gradient}
                >
                    <View style={styles.topRow}>
                        <Text style={styles.title}>TopSpot</Text>
                        <View style={styles.notificationContainer}>
                            <Ionicons name="notifications-outline" size={24} color="white" />
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>3</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.searchContainer}>
                        <Ionicons name="search-outline" size={20} color="#00000080" style={styles.searchIcon} />
                        <TextInput
                            placeholder="Rechercher..."
                            placeholderTextColor="#00000080"
                            style={styles.searchInput}
                        />
                    </View>
                </LinearGradient>


                <CardSection title="Garage du Mois" style={{shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6,}} titleStyle={undefined}>
                    <MonthlyGarage />
                </CardSection>

                <CardSection title="Spots récents" style={undefined} titleStyle={undefined}>
                    <LastsSpots />
                </CardSection>

                <CardSection title="Événement Proche" style={{shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6,}} titleStyle={undefined}>
                    <NearbyEvent />
                </CardSection>

                

                <CardSection title="Garage" style={{shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6,}} titleStyle={undefined}>
                    <Garage />
                </CardSection>
                <CardSection title="Garage" style={{shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6,}} titleStyle={undefined}>
                    <Garage />
                </CardSection>
                <CardSection title="Garage" style={{shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6,}} titleStyle={undefined}>
                    <Garage />
                </CardSection>

                
                <CardSection title="Photos" style={{shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6,}} titleStyle={undefined}>
                    <Picture picture_url={require('../../assets/images/cullinan.jpeg')}/>
                </CardSection>
                <CardSection title="Photos" style={{shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6,}} titleStyle={undefined}>
                    <Picture picture_url={require('../../assets/images/rs6gt.jpeg')}/>
                </CardSection>
                <CardSection title="Photos"  style={{shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6,}} titleStyle={undefined}>
                    <Picture picture_url={require('../../assets/images/ford_gt.jpeg')}/>
                </CardSection>

                <CardSection title="Photos" style={{shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6,}} titleStyle={undefined}>
                    <SuggestedProfiles />
                </CardSection>



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
        <HomeStack.Navigator screenOptions={{ headerShown: false }} >
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
            <HomeStack.Screen name="PicturesPage" component={PicturesPage} initialParams={{ user_id: null }} options={{ headerShown: true }} />
            <HomeStack.Screen name="PicturePage" component={PicturePage} options={{ headerShown: true }} />
        </HomeStack.Navigator>
    );
}




const styles = StyleSheet.create({
    homePage: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    text: {
        fontSize: 26,
        fontWeight: 'bold',
        color: "#FFFFFF",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: "100%"
    },
    scrollView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    gradient: {
        paddingTop: 50,
        paddingHorizontal: 16,
        paddingBottom: 20,
        width: '100%',
        marginBottom: 20,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
    },
    notificationContainer: {
        position: 'relative',
        padding: 5,
    },
    badge: {
        position: 'absolute',
        top: -2,
        right: -2,
        backgroundColor: 'red',
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 1,
        minWidth: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff41',
        borderRadius: 6,
        paddingHorizontal: 10,
        height: 40,
        borderColor: '#ffffff60',
        borderWidth: 0.7,
    },
    searchIcon: {
        marginRight: 6,
    },
    searchInput: {
        flex: 1,
        color: '#000',
    },
});