import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HomeScreenStackParamList } from '../../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { supabase } from '../../../lib/supabase';
import CommentsModal from '../../GeneralComponent/CommentsModal';


type PicturePageProps = {
  pictureWithInfos: Pictures_with_infos;
}

type Pictures_with_infos = {
  picture_id: string;
  description: string | null;
  picture_url: string;
  user_id: string;
  username: string;
  avatar_url: string | null;
  likes_count: number;
  comments_count: number;
  relevance_score: number;
  is_liked: boolean;
  car_id: string,
  car_marque: string,
  car_modele: string,
  car_variante: string,
  car_annee: number,
  car_motorisation: string,
  car_cehvaux: number,
  car_couple: number,
  car_poids: number,
  car_acceleration_0_100: number,
  car_vmax: number,
  car_nb_cylindre: number,
  car_structure_moteur: string
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

  const [isLiked, setIsLiked] = useState(pictureWithInfos.is_liked);
  const [likeCount, setLikeCount] = useState(pictureWithInfos.likes_count);
  const [visible, setVisible] = useState(false);


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


  const handleLike = async () => {
    const { error } = await likePicture(pictureWithInfos.picture_id);
    if (!error) {
      setIsLiked(true);
      setLikeCount(prev => prev + 1);
    }
  };

  const handleUnlike = async () => {
    const { error } = await unlikePicture(pictureWithInfos.picture_id);
    if (!error) {
      setIsLiked(false);
      setLikeCount(prev => prev - 1);
    }
  };

  return (
    <View style={styles.card}>
      <Pressable>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100?img=6' }} // Replace with actual avatar URI
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
        <Image
          source={typeof pictureWithInfos.picture_url === 'string' ? { uri: pictureWithInfos.picture_url } : pictureWithInfos.picture_url} // Replace with the actual image URI from the post
          style={styles.postImage}
        />

        {/* Actions */}
        <View style={styles.actions}>
          <View style={styles.leftActions}>
            <View style={styles.actionItem}>

              {isLiked ?
                <Pressable onPress={handleUnlike}>
                  <Ionicons name="heart" size={24} color="#FF6347" />
                </Pressable>
                :
                <Pressable onPress={handleLike}>
                  <Ionicons name="heart-outline" size={24} color="black" />
                </Pressable>}
              <Text style={styles.actionText}>{likeCount}</Text>
            </View>
            <View style={styles.actionItem}>
              <Pressable onPress={() => setVisible(true)}>
                <Ionicons name="chatbubble-outline" size={24} color="black" />
              </Pressable>
              <Text style={styles.actionText}>{pictureWithInfos.comments_count}</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="bookmark-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <MaterialCommunityIcons name="share-variant" size={24} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Hashtags */}
        <Text style={styles.hashtags}>
          <Text style={styles.car_name}>{pictureWithInfos.car_marque} {pictureWithInfos.car_modele} {pictureWithInfos.car_motorisation}</Text>
        </Text>
        <Text >{pictureWithInfos.description}</Text>
      </Pressable>



      {/* Modal séparé */}
      <CommentsModal
        visible={visible}
        onClose={() => setVisible(false)}
        comments={comments}
      />
    </View>




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
});

export default Picture;