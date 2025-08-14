import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // You'll need to install @expo/vector-icons if you don't have it

const Picture = ({ picture_url }) => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100?img=6' }} // Replace with actual avatar URI
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>PorscheHunter</Text>
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
            <Text style={styles.actionText}>3.4k</Text>
          </View>
          <View style={styles.actionItem}>
            <MaterialCommunityIcons name="comment" size={24} color="#888" />
            <Text style={styles.actionText}>142</Text>
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
        <Text style={styles.hashtag}>Porsche 911 GT3 RS </Text>
        <Text style={styles.hashtag}>🤩 #Supercar #Monaco</Text>
        <Text style={styles.hashtag}> #Porsche</Text>
      </Text>
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
    height: 300, // Adjust height as needed
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