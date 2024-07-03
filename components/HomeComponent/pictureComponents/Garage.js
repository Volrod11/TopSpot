import * as React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PicturesPage from '../pages/PicturesPage';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';



const PlaceholderImage = require('../../../assets/images/senna.png');

export default function Garage({ }) {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate("GaragePage")} style={{height: "100%", width: "100%",}}>
                <Image  ImageViewer source={PlaceholderImage} contentFit="cover" style={styles.picture}/>
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
            </Pressable>
        </View>
    );
}




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
        padding : "40px",
        position: "absolute",
        bottom: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        padding : 8,
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