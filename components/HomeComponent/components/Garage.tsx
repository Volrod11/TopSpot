import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Garage_with_pictures, HomeScreenStackParamList } from '../../../types';
import { supabase } from '../../../lib/supabase';

type GarageProps = {
    garage: Garage_with_pictures
};


//BDD
const likeGarage = async (garage_id: string) => {
    const { data, error } = await supabase.rpc('like_garage', {
        p_garage_id: garage_id,
    })

    if (error) {
        console.error('Erreur like_garage:', error)
        return null
    }

    return { data, error };
}


const unlikeGarage = async (garage_id: string) => {
    const { data, error } = await supabase.rpc('unlike_garage', {
        p_garage_id: garage_id,
    })

    if (error) {
        console.error('Erreur unlike_garage:', error)
        return null
    }

    return { data, error };
}


const PictureCard = ({
    garage_id,
    avatarUrl,
    username,
    location,
    rang,
    images,
    likes,
    comments,
    is_liked,
    nbCategories,
}) => {
    const [isLiked, setIsLiked] = useState(is_liked);
    const [likeCount, setLikeCount] = useState(likes);
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [commentsCount, setCommentsCount] = useState(0);


    const handleLike = async () => {
        if (!isLoading) {
            setIsLoading(true);

            const { error } = await likeGarage(garage_id);
            if (!error) {
                setIsLiked(true);
                setLikeCount(prev => prev + 1);
            }
        }

        setIsLoading(false);
    };

    const handleUnlike = async () => {
        if (!isLoading) {
            setIsLoading(true);

            const { error } = await unlikeGarage(garage_id);
            if (!error) {
                setIsLiked(false);
                setLikeCount(prev => prev - 1);
            }
        }

        setIsLoading(false);
    };


    return (
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
                <View style={styles.actionItem}>

                    {isLiked ?
                        <Pressable onPress={handleUnlike}>
                            <Ionicons name="heart" size={30} color="#FF6347" />
                        </Pressable>
                        :
                        <Pressable onPress={handleLike}>
                            <Ionicons name="heart-outline" size={30} color="black" />
                        </Pressable>}
                    <Text style={styles.actionText}>{likeCount}</Text>
                </View>
                <View style={styles.actionItem}>
                    <Pressable onPress={() => setVisible(true)}>
                        <Ionicons name="chatbubble-outline" size={30} color="black" />
                    </Pressable>
                    <Text style={styles.actionText}>{commentsCount}</Text>
                </View>
                {nbCategories === 4 && <Text style={styles.complete}>Complet ✔</Text>}
            </View>
        </View>
    )
};


const Garage = ({
    garage
}: GarageProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<HomeScreenStackParamList>>();

    return (
        <View style={styles.container}>
            <Pressable >
                <PictureCard
                    garage_id={garage.garage_id}
                    avatarUrl="https://i.pravatar.cc/100?img=8"
                    username={garage.username}
                    location="Paris, France"
                    rang={garage.rang}
                    nbCategories={garage.nb_categories}
                    likes={garage.total_likes}
                    comments={garage.total_comments}
                    is_liked={garage.is_liked}
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
    actionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    actionText: {
        color: '#333',
        marginLeft: 5,
        fontSize: 14,
    },
});

export default Garage;
