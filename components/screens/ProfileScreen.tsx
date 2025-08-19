import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ProfileScreenStackParamList } from '../../types';
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import TabViewProfile from '../useComponent/TabViewProfile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useUser } from '../../context/UserContext';
import ProfileHeader from '../ProfileComponent/ProfileHeader';

const defaultPdp = require('../../assets/default_pfp.png');
const Tab = createStackNavigator<RootStackParamList>();

// Type

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

const ProfileScreen: React.FC = () => {
    const { currentUserId } = useUser();
    const [userProfile, setUserProfile] = useState<Profile | null>(null);

    const navigation = useNavigation<SettingsNavigationProp>();

    useEffect(() => {
        if (currentUserId) {
            const fetchPictureProfile = async () => {
                const profile = await getUsernameAndAvatarUrlFromProfiles(currentUserId);
                setUserProfile(profile);
            };

            fetchPictureProfile();
        }
    }, [currentUserId]);

    const goToSettings= () => {
        navigation.navigate('Settings');
    };

    return (
        <View style={styles.profile_page}>
            <ProfileHeader/>
            {currentUserId && <TabViewProfile />}
        </View>
    );
}



export default ProfileScreen;


const styles = StyleSheet.create({
    profile_page: {
        flex: 1,
        backgroundColor: "#fff",
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
        color: "#0D0D0D",
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
        color: "#0D0D0D",
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
