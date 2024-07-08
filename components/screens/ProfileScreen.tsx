import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Session } from '@supabase/supabase-js'

import PicturesPage from '../HomeComponent/pages/PicturesPage';
import TabViewProfile from '../HomeComponent/useComponent/TabViewProfile'


const PlaceholderImageR8 = require('../../assets/images/r8.png');


export default function ProfileScreen() {
    return (
        <View style={styles.profile_page}>
            <View style={styles.info_user}>
                <View style={styles.profile_image}>
                    <Image src={PlaceholderImageR8} style={styles.image} />
                </View>
                <Text style={styles.user_name}>Garricastres</Text>
            </View>
            <TabViewProfile />
        </View>
    );
}




const styles = StyleSheet.create({
    profile_page: {
        flex: 1,
        backgroundColor: "#0D0D0D",
    },
    text: { 
        fontSize: 26,
        fontWeight: 'bold',
        color: "#fff",
    },
    profile_image: {
        height: 100,
        width: 100,
        borderRadius: 100,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 100,
    },
    info_user: {
        marginTop: 50,
        height: 250,
        justifyContent: 'center', //Centered vertically
        alignItems: 'center',
    },
    user_name: {
        color : "#fff",
        padding : 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
    white_bar: {
        height: 1,
        backgroundColor: "rgb(200,200,200)",
        width: "100%",
    }
});