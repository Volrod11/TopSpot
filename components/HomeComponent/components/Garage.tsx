import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Animated, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Garage_with_pictures_and_description, HomeScreenStackParamList } from '../../../types';
import { supabase } from '../../../lib/supabase';
import DoubleTapLike from '../../GeneralComponent/DoubleTapLike';

type GarageProps = {
    garage: Garage_with_pictures_and_description
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
    description,
    is_liked,
    nbCategories,
}) => {
    const scaleAnim = useRef(new Animated.Value(0)).current;

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

    const handleDoubleTap = async () => {
        if (!isLiked) {
            handleLike();
            animateHeart();
        }
    };


    const animateHeart = () => {
        scaleAnim.setValue(0);
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 4,
            useNativeDriver: true,
        }).start(() => {
            Animated.timing(scaleAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }).start();
        });
    };


    return (
        <View style={styles.widgetCard}>
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

            {/* ✅ Description (au-dessus des images) */}
            {description ? (
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>{description}</Text>
                </View>
            ) : null}

            {/* Images */}
            <DoubleTapLike onDoubleTap={handleDoubleTap}>
                <View style={styles.imageHeart}>
                    <View style={styles.imageGrid}>
                        {images.map((_pic, index) => (
                            <Image
                                key={index}
                                source={
                                    _pic.id === null
                                        ? require('../../../assets/no_picture.png')
                                        : { uri: _pic.url }
                                }
                                style={styles.image}
                            />
                        ))}
                    </View>

                    {/* ✅ Badge unique */}
                    {nbCategories === 4 && (
                        <View style={styles.completeBadge}>
                            <Text style={styles.completeText}>Complet ✔</Text>
                        </View>
                    )}

                    {/* ❤️ Animation */}
                    <Animated.View
                        style={[
                            styles.heartContainer,
                            { transform: [{ scale: scaleAnim }], opacity: scaleAnim },
                        ]}
                    >
                        <Image
                            source={require("../../../assets/heart.png")}
                            style={styles.heart}
                        />
                    </Animated.View>
                </View>
            </DoubleTapLike>

            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.leftActions}>
                    <View style={styles.actionItem}>
                        {isLiked ? (
                            <Pressable onPress={handleUnlike}>
                                <Ionicons name="heart" size={28} color="#FF6347" />
                            </Pressable>
                        ) : (
                            <Pressable onPress={handleLike}>
                                <Ionicons name="heart-outline" size={28} color="#333" />
                            </Pressable>
                        )}
                        <Text style={styles.actionText}>{likeCount}</Text>
                    </View>
                    <View style={styles.actionItem}>
                        <Pressable onPress={() => setVisible(true)}>
                            <Ionicons name="chatbubble-outline" size={28} color="#333" />
                        </Pressable>
                        <Text style={styles.actionText}>{comments}</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="share-variant" size={28} color="#888" />
                </TouchableOpacity>
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
                    description={garage.description}
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
        paddingHorizontal: 5
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
        //borderRadius: 3,
        marginBottom: 2,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5
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
    leftActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionText: {
        color: '#333',
        marginLeft: 5,
        fontSize: 14,
    },
    imageHeart: {
        position: "relative",
    },
    heartContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 100,
        height: 100,
        marginLeft: -50,
        marginTop: -50,
        justifyContent: "center",
        alignItems: "center",
    },
    heart: {
        width: 100,
        height: 100,
        tintColor: "white"
    },
    completeBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(39, 146, 18, 0.6)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        zIndex: 10, // 👈 pour s'assurer que ça passe devant les images
    },
    completeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    widgetCard: {
        backgroundColor: '#fff',
        borderRadius: 18,
        paddingVertical: 12,
        marginVertical: 12,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4, // ✅ Ombre Android
    },
    descriptionContainer: {
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        marginHorizontal: 5,
        marginBottom: 10,   // ✅ espace avant les images
    },
    descriptionText: {
        color: '#444',
        fontSize: 13,
        lineHeight: 18,
    },
});

export default Garage;
