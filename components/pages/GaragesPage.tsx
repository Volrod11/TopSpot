import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';
import { useEffect, useState } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

import MiniGarageCard from '../GarageComponent/components/MiniGarageCard';
import MyGarageCard from '../GarageComponent/components/MyGarageCard';
import { useUser } from '../../context/UserContext';
import LastsSpots from '../HomeComponent/components/LastsSpots';


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
    is_garages_page_menu: boolean;
};

type Picture = {
    id: string | null;
    url: string | null;
    car_type: string;
}

type Garage_with_pictures = {
    garage_id: string;
    username: string;
    avatar_url: string | null;
    nb_categories: number;
    total_likes: number;
    total_comments: number;
    top_pictures_by_category: Picture[];
};



//Const Function
const fetchGaragesFromDatabase = async (user_id: string | null, is_garages_page_menu: boolean) => {

    
    const { data: Garage_with_pictures, error } = await supabase
        .rpc("get_garages_and_car_types_with_details", { profile_param: user_id, is_current_user: is_garages_page_menu });
    if (error) {
        console.error("Error fetching garages : ", error);
    }

    return (Garage_with_pictures ?? []);

};



const GaragesPage: React.FC<GaragesPageProps> = ({ user_id, is_garages_page_menu }) => {
    const [garages, setGarages] = useState<Garage_with_pictures[]>([])
    const [myGarage, setMyGarage] = useState<Garage_with_pictures[]>([])

    const { currentUserId } = useUser();




    useEffect(() => {
        const fetchData = async () => {
            const fetchedMyGarage = is_garages_page_menu ? await fetchGaragesFromDatabase(currentUserId, is_garages_page_menu) : [];
            const fetchedGarages = await fetchGaragesFromDatabase(user_id, false);

            setGarages(fetchedGarages);
            setMyGarage(fetchedMyGarage);
            
        };

        fetchData();
    }, []);


    return (
        <View style={styles.main_style}>
            { garages.length > 0 ? (
                <View style={{ flex: 1 }}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={garages}
                        keyExtractor={item => item.garage_id}
                        numColumns={2}
                        columnWrapperStyle={styles.row}
                        contentContainerStyle={{ padding: 12, flexGrow: 1 }}
                        ListHeaderComponent={
                            is_garages_page_menu ? (
                                <View style={styles.myGarageCard}>
                                    <MyGarageCard garage_with_pictures={myGarage[0]} />
                                </View>
                            ) : null
                        }
                        renderItem={({ item }) => (<MiniGarageCard garage_with_pictures={item} />)}
                    />
                </View>
            ) : (
                <Text style={styles.chargement}>Chargement...</Text>
            )}
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
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        paddingHorizontal: 10,
        paddingBottom: 16,
    },
    chargement: {
        alignSelf: 'center',
    }
});
