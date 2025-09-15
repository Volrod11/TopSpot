import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeScreenStackParamList } from '../../../types';

type GarageProps = {
    garage: Garage_with_pictures
};

type Picture = {
    id: string | null;
    url: string | null;
    car_type: string;
};

type Garage_with_pictures = {
    garage_id: string;
    username: string;
    avatar_url: string | null;
    nb_categories: number;
    total_likes: number;
    total_comments: number;
    total_pictures: number;
    total_views: number;
    created_at: string;
    rang: number;
    top_pictures_by_category: Picture[];
};

const PictureCard = ({
    avatarUrl,
    username,
    location,
    rang,
    images,
    likes,
    comments,
    nbCategories,
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
            {rang <= 10 && (
                <View style={styles.rankBadge}>
                    <Text style={styles.rankText}>#{rang}</Text>
                </View>
            )}
        </View>

        {/* Images Grid */}
        <View style={styles.imageGrid}>
            {images.map((_pic, index) => (
                <Image key={index} source={
                    _pic.id === null
                        ? require('../../../assets/no_picture.png')
                        : { uri: _pic.url }
                } style={styles.image} />
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
            {nbCategories === 4 && <Text style={styles.complete}>Complet ✔</Text>}
        </View>
    </View>
);


const Garage = ({
    garage
}: GarageProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<HomeScreenStackParamList>>();

    return (
        <View style={styles.container}>
            <Pressable >
                <PictureCard
                    avatarUrl="https://i.pravatar.cc/100?img=8"
                    username={garage.username}
                    location="Paris, France"
                    rang={garage.rang}
                    nbCategories={garage.nb_categories}
                    likes={garage.total_likes}
                    comments={garage.total_comments}
                    images={garage.top_pictures_by_category}
                />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
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
