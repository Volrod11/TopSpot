import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View, StyleSheet, Image, Pressable, ListRenderItem, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../../lib/supabase';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import Garage from '../pictureComponents/Garage';

//Type
type GaragesPageProps = {
    user_id: string|null;
};


type Garage = {
    id: string;
    car_types: string[];
};



//Const Function
const fetchGaragesFromDatabase = async (user_id : string) => {
    if (user_id) {
        const { data, error } = await supabase.from("garages").select("id, car_types").eq("user_id", user_id);
        if (error) {
            console.error("Error fetching garages : ", error);
        }
        return(data ?? []);
    }
};



const GaragesPage: React.FC<GaragesPageProps> = ({ user_id }) => {
    const [garages, setGarages] = useState<{ id: string; car_types: string[] }[]>([])
    
    const navigation = useNavigation();

    
    useEffect(() => {
        const loadGarages = async () => {
            const fetchedGarages = await fetchGaragesFromDatabase(user_id);
            console.log("fetchedGarages", fetchedGarages);
            
            setGarages(fetchedGarages);
        };
        console.log(garages);
        loadGarages();
    }, []);


    //Garage Component
    const renderItem: ListRenderItem<Garage> = ({ item }) => (
        <Garage key={item.id} garage_id={item.id}/>
    );

    
    

    return (
        <View style={styles.garagePage}>
            <FlatList
                data={garages}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.flat_list}
                shouldActivateOnStart={false}
                numColumns={2}
            />
        </View>
      
    );
}

export default GaragesPage;

const styles = StyleSheet.create({
    garagePage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#0D0D0D",
    },
    scrollView: {
        alignItems: 'center',
        justifyContent: 'center',
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
});
