import * as React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../../lib/supabase';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../types';
import { useState, useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';



const PlaceholderImage = require('../../../assets/images/senna.png');
type GarageNavigationProp = StackNavigationProp<RootStackParamList, 'Garage'>;

//Type
type GarageRouteProp = RouteProp<RootStackParamList, 'Garage'>;

type Props = {
    garage_id: string;
};

//Const Function
const getNumberOfPicturesFromGarage = async (garage_id : string) => {
    if (garage_id) {
        const { count, error } = await supabase
        .from("pictures_in_garages")
        .select('*', { count: 'exact', head: true })
        .eq("garage_id", garage_id);
        if (error) {
            console.error("Error getting count picture from garage : ", error);
        }
        return(count);
    }
};


const Garage: React.FC<Props> = ({ garage_id }) => {
    const navigation = useNavigation<GarageNavigationProp>();

    const [picturesCount, setPicturesCount] = useState<number>();

    const goToGaragePage = (garage_id : string) => {
        navigation.navigate('GaragePage', { garage_id : garage_id });
    };

    useEffect(() => {
        const loadPictureCount = async () => {
            const loadedPicturesCount = await getNumberOfPicturesFromGarage(garage_id);
            setPicturesCount(loadedPicturesCount);
        };

        loadPictureCount();
    }, []);

    return (
        <View style={styles.container}>
            <Pressable onPress={() => goToGaragePage(garage_id)} style={{height: "100%", width: "100%",}}>
                {picturesCount === 0 ? (
                    <Text>C'est vide</Text>
                ) : (
                    <View style={{flex : 1}}>
                    <Image source={PlaceholderImage} style={styles.picture}/>
                        <View style={styles.footer}>
                            <View style={styles.info_garage}>
                                <Ionicons name="car-sport-outline" size={20} color="rgb(150,150,150)" />
                                <Text style={styles.info_number}>4</Text>
                            </View>
                            <View style={styles.info_garage}>
                                <Ionicons name="heart-outline" size={20} color="rgb(150,150,150)" />
                                <Text style={styles.info_number}>3.5k</Text>
                            </View>
                            <View style={styles.info_garage}>
                                <Ionicons name="chatbox-outline" size={20} color="rgb(150,150,150)" />
                                <Text style={styles.info_number}>5</Text>
                            </View>
                        </View>
                    </View>
                )}
            </Pressable>
        </View>
    );
}


export default Garage;

const styles = StyleSheet.create({
    container: {
        height: 290,
        width: "48%",
        marginBottom: 20,
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: "white",
        margin: "1%",
    },
    footer : {
        height : 40,
        width : "100%",
        backgroundColor : "rgb(0,0,0)",
        padding : 8,
        position: "absolute",
        bottom: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    title : {
        color : "#fff",
        padding : 10,
        fontSize: 26,
        fontWeight: 'bold',
    },
    picture: {
        justifyContent: 'center',
        width: "100%",
        height: 250,
    },
    info_number : {
        color : "#fff",
        padding : 4,
        fontSize: 10,
        fontWeight: 'bold',
    },
    info_garage : {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
    }
});