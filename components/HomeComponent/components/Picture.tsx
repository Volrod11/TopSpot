import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // You'll need to install @expo/vector-icons if you don't have it
import { HomeScreenStackParamList } from '../../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


type PicturesPageProps = {
  picture_id: string;
  description: string | null;
  picture_url: string;
  user_id: string;
  username: string;
  avatar_url: string | null;
  likes_count: number;
  comments_count: number;
}

const Picture = ({
  picture_id,
  description,
  picture_url,
  user_id,
  username,
  avatar_url,
  likes_count,
  comments_count
}: PicturesPageProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeScreenStackParamList>>();


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
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.location}>Monaco</Text>
          </View>
          <TouchableOpacity style={styles.moreIcon}>
            <MaterialCommunityIcons name="dots-horizontal" size={24} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Post Image */}
        <Image
          source={typeof picture_url === 'string' ? { uri: picture_url } : picture_url} // Replace with the actual image URI from the post
          style={styles.postImage}
        />

        {/* Actions */}
        <View style={styles.actions}>
          <View style={styles.leftActions}>
            <View style={styles.actionItem}>
              <MaterialCommunityIcons name="heart" size={24} color="#FF6347" />
              <Text style={styles.actionText}>{likes_count}</Text>
            </View>
            <View style={styles.actionItem}>
              <MaterialCommunityIcons name="comment" size={24} color="#888" />
              <Text style={styles.actionText}>{comments_count}</Text>
            </View>
            <TouchableOpacity>
              <MaterialCommunityIcons name="bookmark" size={24} color="#888" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <MaterialCommunityIcons name="share-variant" size={24} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Hashtags */}
        <Text style={styles.hashtags}>
          <Text style={styles.hashtag}>{description}</Text>
        </Text>
      </Pressable>
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
  hashtag: {
    fontWeight: 'bold',
  },
});

export default Picture;