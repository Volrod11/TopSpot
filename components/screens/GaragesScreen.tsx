import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import GaragesPage from '../pages/GaragesPage';
import GaragePage from '../pages/GaragePage';

import Garage from '../HomeComponent/components/GarageAncien';
import WeeklyPic from '../HomeComponent/components/WeeklyPic';
import SharedGarage from '../HomeComponent/components/SharedGarage';
import SharedPicture from '../HomeComponent/components/SharedPicture';
import FourPictures from '../HomeComponent/components/FourPictures';
import { FlatList } from 'react-native-gesture-handler';
import MiniGarageCard from '../GarageComponent/components/MiniGarageCard';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import LastsSpots from '../HomeComponent/components/NearbyCars';
import EventsHeader from '../GeneralComponent/Header';
import SegmentedButtons from '../GeneralComponent/SegmentedButtons';
import { useUser } from "../../context/UserContext";
import SearchBarWithFilter from "../GeneralComponent/SearchBar";


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


const GaragesScreen = () => {
    const { currentUserId } = useUser();
    const [selected, setSelected] = useState("Du Mois");
    const [nbGarages, setNbGarages] = useState(0);
    const [searchText, setSearchText] = useState('');

    // --- Calculs dynamiques ---
    const now = new Date();

    // Obtenir le mois en toutes lettres
    const rawMonthName = now.toLocaleString("fr-FR", { month: "long" });
    const monthName = rawMonthName.charAt(0).toUpperCase() + rawMonthName.slice(1);

    const year = now.getFullYear();

    // Calcul des jours restants dans le mois
    const endOfMonth = new Date(year, now.getMonth() + 1, 0); // dernier jour du mois
    const daysLeftMonth = Math.ceil(
        (endOfMonth.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Calcul des jours restants dans l'année
    const endOfYear = new Date(year, 11, 31);
    const daysLeftYear = Math.ceil(
        (endOfYear.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Texte principal et sous-texte
    let title = "";
    let subtitle = "";
    let color = "";

    if (selected === "Du Mois") {
        title = `Garage ${monthName} ${year}`;
        if (daysLeftMonth < 1) {
            subtitle = `Dernier jour !`;
        } else {
            subtitle = `${daysLeftMonth} j restants`;
        }

        if (daysLeftMonth <= 3) {
            color = "#DC3545"; // Rouge
        } else if (daysLeftMonth <= 7) {
            color = "#FFA500"; // Orange
        } else {
            color = "#28A745"; // Vert
        }
    } else if (selected === "De l'année") {
        title = `Garage ${year}`;
        if (daysLeftYear < 1) {
            subtitle = `Dernier jour !`;
        } else {
            subtitle = `${daysLeftYear} j restants`;
        }
        if (daysLeftYear <= 30) {
            color = "#DC3545"; // Rouge
        } else if (daysLeftYear <= 90) {
            color = "#FFA500"; // Orange
        } else {
            color = "#28A745"; // Vert
        }
    } else if (selected === "Annuels") {
        title = `Garages Annuels`;
        if (daysLeftYear < 1) {
            subtitle = `Dernier jour !`;
        } else {
            subtitle = `${daysLeftYear} j restants`;
        }
        if (daysLeftYear <= 30) {
            color = "#DC3545"; // Rouge
        } else if (daysLeftYear <= 90) {
            color = "#FFA500"; // Orange
        } else {
            color = "#28A745"; // Vert
        }
    } else {
        title = "Garages Mensuels";
        subtitle = `${nbGarages} garage${nbGarages > 1 ? "s" : ""}`;
    }



    const handleSearch = (text) => {
        console.log("Recherche lancée pour :", text);
        // Ici, vous pouvez déclencher la logique de recherche
    };



    return (
        <View style={{ flex: 1 }}>
            <SearchBarWithFilter
                onSearch={handleSearch}
            />


            <SegmentedButtons selected={selected} onChange={setSelected} />

            <View style={styles.secondHeader}>
                <Text style={styles.garageDuMoisText}>{title}</Text>
                <View style={styles.date}>
                    <MaterialCommunityIcons name="clock" size={18} color={color} />
                    <Text style={styles.dateText}>{subtitle}</Text>
                </View>
            </View>

            {/* Ici tu adaptes le contenu */}
            {selected === "Du Mois" && (
                <GaragesPage user_id={null} show_my_garage={true} garage_type={"monthly"} is_finished={false} />
            )}
            {selected === "Mensuels" && (
                <GaragesPage user_id={null} show_my_garage={false} garage_type={"monthly"} is_finished={true} />
            )}
            {selected === "Annuels" && (
                <GaragesPage user_id={null} show_my_garage={false} garage_type={"annual"} is_finished={true} />
            )}
            {selected === "Mes Garages" && (
                <GaragesPage user_id={currentUserId} show_my_garage={false} garage_type={"monthly"} onCountChange={setNbGarages} />
            )}

        </View>
    );
};


const GarageStack = createNativeStackNavigator();

export default function GarageStackScreen() {
    return (
        <GarageStack.Navigator screenOptions={{
            headerShown: false
        }} >
            <GarageStack.Screen name="GaragesScreen" component={GaragesScreen} />
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
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f0f0f0',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#333',
    },
    icon: {
        marginRight: 10,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007aff', // Bleu iOS
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    filterText: {
        color: '#fff',
        fontWeight: 'bold',
        marginRight: 5,
        fontSize: 16,
    },
    secondHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    date: {
        flexDirection: 'row',
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
        paddingLeft: 4,
    },


});











