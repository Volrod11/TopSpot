import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HomeScreenStackParamList, Pictures_with_infos } from '../../../types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { supabase } from '../../../lib/supabase';
import CommentsModal from '../../GeneralComponent/CommentsModal';
import DoubleTapLike from '../../GeneralComponent/DoubleTapLike';


export type PicturePageProps = {
  pictureWithInfos: Pictures_with_infos;
}


//BDD
const likePicture = async (picture_id: string) => {
  const { data, error } = await supabase.rpc('like_picture', {
    p_picture_id: picture_id,
  })

  if (error) {
    console.error('Erreur like_picture:', error)
    return null
  }

  return { data, error };
}


const unlikePicture = async (picture_id: string) => {
  const { data, error } = await supabase.rpc('unlike_picture', {
    p_picture_id: picture_id,
  })

  if (error) {
    console.error('Erreur unlike_picture:', error)
    return null
  }

  return { data, error };
}




const Picture = ({
  pictureWithInfos
}: PicturePageProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeScreenStackParamList>>();
  const lastTap = useRef<number | null>(null);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const defaultAvatar = pictureWithInfos.avatar_url ?? "https://i.pravatar.cc/100?img=9";

  const [isLiked, setIsLiked] = useState(pictureWithInfos.is_liked);
  const [likeCount, setLikeCount] = useState(pictureWithInfos.likes_count);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);


  const comments = [
    {
      id: "1",
      user: "Jean Dupont",
      text: "Super article !",
      likes: 12,
      timeAgo: "il y a 2h",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: "2",
      user: "Marie Claire",
      text: "Merci pour le partage 🙏",
      likes: 8,
      timeAgo: "il y a 5h",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: "3",
      user: "Alex Martin",
      text: "J’adore ce contenu 😍",
      likes: 25,
      timeAgo: "hier",
      avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    },
  ];


  useEffect(() => {
    setCommentsCount(pictureWithInfos.comments_count);
  }, [pictureWithInfos.comments_count])


  const handleLike = async () => {
    if (!isLoading) {
      setIsLoading(true);

      const { error } = await likePicture(pictureWithInfos.picture_id);
      if (!error) {
        setIsLiked(true);
        setLikeCount(prev => prev + 1);
      }

      setIsLoading(false);
    }
  };

  const handleUnlike = async () => {
    if (!isLoading) {
      setIsLoading(true);

      const { error } = await unlikePicture(pictureWithInfos.picture_id);
      if (!error) {
        setIsLiked(false);
        setLikeCount(prev => prev - 1);
      }

      setIsLoading(false);
    }
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
    <View style={styles.card}>
      <Pressable>
        {/* Header */}
        <View style={styles.header}>

          <Image
            source={{ uri: defaultAvatar }}
            style={styles.avatar}
          />



          <View style={styles.userInfo}>
            <Text style={styles.username}>{pictureWithInfos.username}</Text>
            <Text style={styles.location}>Monaco</Text>
          </View>
          <TouchableOpacity style={styles.moreIcon}>
            <MaterialCommunityIcons name="dots-horizontal" size={24} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Post Image */}
        <DoubleTapLike onDoubleTap={handleDoubleTap}>
          <View style={styles.imageHeart}>
            <Image
              source={typeof pictureWithInfos.picture_url === 'string' ? { uri: pictureWithInfos.picture_url } : pictureWithInfos.picture_url} // Replace with the actual image URI from the post
              style={styles.postImage}
            />

            <Animated.View
              style={[
                styles.heartContainer,
                {
                  transform: [{ scale: scaleAnim }],
                  opacity: scaleAnim,
                },
              ]}
            >
              <Image
                source={require("../../../assets/heart.png")}
                style={styles.heart}
              />

            </Animated.View>

          </View>
        </DoubleTapLike>

        {/* Actions */}
        <View style={styles.actions}>
          <View style={styles.leftActions}>
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
            <TouchableOpacity>
              <Ionicons name="bookmark-outline" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <MaterialCommunityIcons name="share-variant" size={30} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Hashtags */}
        <Text style={styles.hashtags}>
          <Text style={styles.car_name}>{pictureWithInfos.car_marque} {pictureWithInfos.car_modele} {pictureWithInfos.car_motorisation}</Text>
        </Text>
        <Text >{pictureWithInfos.description}</Text>
      </Pressable >



      {/* Modal séparé */}
      < CommentsModal
        visible={visible}
        onClose={() => setVisible(false)}
        picture_or_garage_id={pictureWithInfos.picture_id}
        content_type={"picture"}
        onCommentsChange={(count: number) => setCommentsCount(count)}
      />
    </View >




  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  location: {
    color: '#AAA',
    fontSize: 12,
  },
  moreIcon: {
    padding: 5,
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
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
  hashtags: {
    color: '#333',
    paddingHorizontal: 10,
    paddingBottom: 10,
    fontSize: 14,
  },
  car_name: {
    fontWeight: 'bold',
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
});

export default Picture;