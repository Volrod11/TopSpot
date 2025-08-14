import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View, StyleSheet, Image, Pressable, ListRenderItem } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../../lib/supabase';
import { useEffect, useState } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

import Garage from '../components/GarageAncien';
import MiniGarageCard from '../../GarageComponent/components/MiniGarageCard';
import MyGarageCard from '../../GarageComponent/components/MyGarageCard';


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


//Type
type GaragesPageProps = {
    user_id: string | null;
};


type Garage_with_pictures = {
    garage_id: string;
    username: string;
    avatar_url: string;
    nb_categories: number;
    total_likes: number;
    total_comments: number;
    top_pictures_by_category: {
        id: string | null;
        url: string | null;
        car_types: string;
    }[];
};



//Const Function
const fetchGaragesFromDatabase = async (user_id: string | null) => {
    console.log("Fetching garages for user_id:", user_id);

    if (user_id != null) {
        const { data: Garage_with_pictures, error } = await supabase
            .rpc("get_garages_and_car_types_with_details2", { user_id: user_id });
        if (error) {
            console.error("Error fetching garages : ", error);
        }

        return (Garage_with_pictures ?? []);
    } else {
        const { data: Garage_with_pictures, error } = await supabase
            .rpc("get_garages_and_car_types_with_details2");
        if (error) {
            console.error("Error fetching garages : ", error);
        }
        console.log("Garages fetched: ", Garage_with_pictures);

        return (Garage_with_pictures ?? []);
    }
};

const fetchCarTypesFromDatabase = async () => {
    const { data: carTypes, error } = await supabase
        .from('garage_configurations')
        .select('car_types')
        .order('created_at', { ascending: true })
        .limit(1);

    if (error) {
        console.error("Error fetching car types: ", error);
        return [];
    }

    return carTypes;
}



const GaragesPage: React.FC<GaragesPageProps> = ({ user_id }) => {
    const [garages, setGarages] = useState<Garage_with_pictures[]>([])
    const [carTypes, setCarTypes] = useState<String[]>([]);

    const navigation = useNavigation();


    useEffect(() => {
        const fetchData = async () => {

            const fetchedCarTypes = await fetchCarTypesFromDatabase();

            const fetchedGarages = await fetchGaragesFromDatabase(user_id);
            console.log("fetchedGarages", fetchedGarages);

            setCarTypes(fetchedCarTypes.map((type) => type.car_types));
            setGarages(fetchedGarages);

            console.log("Garages fetched: ", fetchedGarages[0]);

        };

        fetchData();
    }, []);




    return (
        <View style={styles.main_style}>
            <ScrollView>
                <View style={styles.myGarageCard}>
                    <MyGarageCard />
                </View>
                <FlatList
                    data={garages}
                    renderItem={({ item }) => <MiniGarageCard garage_with_pictures={item} car_types={carTypes} />}
                    keyExtractor={item => item.garage_id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.container_garage}
                />
            </ScrollView>
        </View>
    );
}

export default GaragesPage;

const styles = StyleSheet.create({
    main_style: {
        flex: 1,
    },
    myGarageCard: {
        alignItems: 'center'
    },
    garagePage: {
        flex: 1,
        backgroundColor: "#0D0D0D",
    },
    container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    flat_list: {
        justifyContent: 'center',
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingTop: 10,
    },
    container_garage: {
        paddingHorizontal: 10, paddingBottom: 16
    },
});
