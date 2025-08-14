import * as React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PicturesPage from '../pages/PicturesPage';

const PlaceholderImage = require('../../../assets/images/senna.png');

export default function SharedPicture({ }) {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate("PicturesPage")} style={{height: 500, width: 350,}}>
                <ImageBackground  ImageViewer source={PlaceholderImage} resizeMode="cover" style={styles.picture}>
                    <View style={styles.footer}>
                        <Text style={styles.title}>Photo la plus partagée</Text>
                    </View>
                </ImageBackground>
            </Pressable>
        </View>
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 500,
        width: 350,
        marginBottom: 50,
        borderRadius: 15,
        overflow: 'hidden'
    },
    footer : {
        height : 90,
        width : "100%",
        backgroundColor : "rgba(0,0,0,0.42)",
        padding : "40px",
        position: "absolute",
        bottom: 0,
    },
    title : {
        color : "#fff",
        padding : 10,
        fontSize: 26,
        fontWeight: 'bold',
    },
    picture: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 40,
    }
});