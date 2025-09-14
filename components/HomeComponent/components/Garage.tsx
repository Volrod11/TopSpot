import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeScreenStackParamList } from '../../../types';

type GarageProps = {
    user_id?: string | null;
    show_my_garage?: boolean | null;
    garage_type?: string |null;
    is_finished?: boolean | null;
    sort_by?: string | null;
    query?: string | null;
};

const PictureCard = ({
    avatarUrl,
    username,
    location,
    isTopSpot,
    images,
    likes,
    comments,
    isComplete,
}) => (
    <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
            <View style={styles.userInfo}>
                <Image source={{ uri: avatarUrl }} style={styles.avatar} />
                <View>
                    <Text style={styles.username}>{username}</Text>
                    <Text style={styles.location}>{location}</Text>
                </View>
            </View>
            {isTopSpot && (
                <View style={styles.rankBadge}>
                    <Text style={styles.rankText}>#1</Text>
                </View>
            )}
        </View>

        {/* Images Grid */}
        <View style={styles.imageGrid}>
            {images.map((url, index) => (
                <Image key={index} source={url} style={styles.image} />
            ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
            <View style={styles.stats}>
                <Ionicons name="heart" size={16} color="#E74C3C" />
                <Text style={styles.statText}>{likes}</Text>
                <Ionicons name="chatbubble" size={16} color="#3498DB" style={{ marginLeft: 12 }} />
                <Text style={styles.statText}>{comments}</Text>
            </View>
            {isComplete && <Text style={styles.complete}>Complet ✔</Text>}
        </View>
    </View>
);


const Garage = ({
    user_id = null,
    show_my_garage = null,
    garage_type = null,
    is_finished = null,
    sort_by = null,
    query = null,
}: GarageProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<HomeScreenStackParamList>>();

    return (
        <View style={styles.container}>
            <Pressable onPress={() =>
                navigation.navigate('GaragesPage', {
                    user_id: user_id,
                    show_my_garage: show_my_garage,
                    garage_type: garage_type,
                    is_finished: is_finished,
                    sort_by: sort_by,
                    query: query,
                })
            }>
                <PictureCard
                    avatarUrl="https://i.pravatar.cc/100?img=8"
                    username="Alex_SuperCars"
                    location="Paris, France"
                    isTopSpot={true}
                    isComplete={true}
                    likes={1200}
                    comments={87}
                    images={[
                        require('../../../assets/images/sto.jpeg'),
                        require('../../../assets/images/chiron.jpeg'),
                        require('../../../assets/images/911dakar.jpeg'),
                        require('../../../assets/images/mustang.jpeg'),
                    ]}
                />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
    },
    card: {
        backgroundColor: '#ffffffff',
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        marginRight: 8,
    },
    username: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 14,
    },
    location: {
        color: '#ccc',
        fontSize: 12,
    },
    rankBadge: {
        backgroundColor: '#FF4C4C',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    rankText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    image: {
        width: '49.5%',
        height: 150,
        borderRadius: 3,
        marginBottom: 2,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    stats: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statText: {
        color: '#333',
        marginLeft: 4,
        fontSize: 13,
    },
    complete: {
        color: '#00D26A',
        fontWeight: 'bold',
        fontSize: 13,
    },
});

export default Garage;
