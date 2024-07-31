import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Session } from '@supabase/supabase-js'

import PicturePage from '../HomeComponent/pages/PicturePage';
import TabViewProfile from '../HomeComponent/useComponent/TabViewProfile'
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from "../../types";
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const PlaceholderImageR8 = require('../../assets/images/r8.png');
const Tab = createStackNavigator<RootStackParamList>();

type User = {
    id: string;
    email?: string;
    user_metadata?: {
        [key: string]: any;
    };
  };

const ProfileScreen: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
          const { data, error } = await supabase.auth.getSession();
          if (error) {
            console.error('Error fetching session:', error);
            return;
          }
          const sessionUser = data.session?.user ?? null;
          setUser(sessionUser);
        };
    
        fetchUser();
      }, []);

    return (
        <View style={styles.profile_page}>
            <View style={styles.info_user}>
                <View style={styles.profile_image}>
                    <Image src={PlaceholderImageR8} style={styles.image} />
                </View>
                <Text style={styles.user_name}>Garricastres</Text>
            </View>
            {user && <TabViewProfile user_id={user.id} />}
        </View>
    );
}

const ProfileScreenStack: React.FC = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
            <Tab.Screen name="PicturePage" component={PicturePage} />
        </Tab.Navigator>
    )
}


export default ProfileScreenStack;

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