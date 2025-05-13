import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ProfileScreenStackParamList } from '../../types';
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import TabViewProfile from '../HomeComponent/useComponent/TabViewProfile';
import Ionicons from 'react-native-vector-icons/Ionicons';

const defaultPdp = require('../../assets/default_pfp.png');
const Tab = createStackNavigator<RootStackParamList>();

// Type
type ProfileScreenRouteProp = RouteProp<ProfileScreenStackParamList, 'ProfileScreen'>;
type SettingsNavigationProp = StackNavigationProp<ProfileScreenStackParamList, 'Settings'>;

type RootStackParamList = {
    ProfileScreen: { user_id: string };
    PicturePage: undefined; // Adjust as needed
};

type User = {
    id: string;
    email?: string;
    user_metadata?: {
        [key: string]: any;
    };
};

type Profile = {
    id: string;
    username: string | null;
    avatar_url: string | null;
};

// DB function
const getUsernameAndAvatarUrlFromProfiles = async (profile_id: string): Promise<Profile | null> => {
    const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, username, avatar_url')
        .eq('id', profile_id)
        .single();

    if (profileError) {
        console.error('Error fetching profile data:', profileError);
    }

    return profileData;
}

const ProfileScreen: React.FC<{ route: ProfileScreenRouteProp }> = ({ route }) => {
    const { user_id } = route.params; 
    const [userProfile, setUserProfile] = useState<Profile | null>(null);

    const navigation = useNavigation<SettingsNavigationProp>();

    useEffect(() => {
        if (user_id) {
            const fetchPictureProfile = async () => {
                const profile = await getUsernameAndAvatarUrlFromProfiles(user_id);
                setUserProfile(profile);
            };

            fetchPictureProfile();
        }
    }, [user_id]);

    const goToSettings= () => {
        navigation.navigate('Settings');
    };

    return (
        <View style={styles.profile_page}>
            <View style={styles.topButtons}>
                <TouchableOpacity onPress={goToSettings} style={styles.btnNormal}>
                    <Ionicons name="ellipsis-horizontal" size={30} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.info_user}>
                <View style={styles.profile_image}>
                    {userProfile ? ( <Image source={userProfile.avatar_url ? { uri: userProfile.avatar_url } : defaultPdp} style={styles.image} />) : null}
                </View>
                {userProfile && <Text style={styles.user_name}>{userProfile.username}</Text>}
            </View>
            {user_id && <TabViewProfile user_id={user_id} />}
        </View>
    );
}



export default ProfileScreen;


const styles = StyleSheet.create({
    profile_page: {
        flex: 1,
        backgroundColor: "#0D0D0D",
    },
    topButtons: {
        flex:0.15,
        marginTop: 30,
        flexDirection: "row-reverse",
        alignItems: "center",
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
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    user_name: {
        color: "#fff",
        padding: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
    white_bar: {
        height: 1,
        backgroundColor: "rgb(200,200,200)",
        width: "100%",
    },
    btnNormal: {
        width: 35,
        height: 35,
        marginRight: 10,
    },
});
