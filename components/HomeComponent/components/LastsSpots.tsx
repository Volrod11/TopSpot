import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SpotCard = ({
  imageUrl,
  avatarUrl,
  username,
  description,
  timeAgo,
  likes,
  comments
}) => (
  <View style={styles.container}>
    <Image source={imageUrl} style={styles.image} />
    <View style={styles.info}>
      <View style={styles.header}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.time}>{timeAgo}</Text>
      </View>
      <Text style={styles.description} numberOfLines={1} ellipsizeMode='tail' >{description}</Text>
      <View style={styles.reactions}>
        <Ionicons name="heart" size={16} color="#E74C3C" />
        <Text style={styles.reactionText}>{likes}</Text>
        <Ionicons name="chatbubble" size={16} color="#3498DB" style={{ marginLeft: 10 }} />
        <Text style={styles.reactionText}>{comments}</Text>
      </View>
    </View>
  </View>
);

const LastsSpots = () => (
  <View>
    <SpotCard
      imageUrl={require('../../../assets/images/svj.jpg')}
      avatarUrl="https://i.pravatar.cc/100?img=9"
      username="Mathis Lague"
      description="Lambo Aventador SVJ à Nogaro"
      timeAgo="2h"
      likes={245}
      comments={12}
    />
    <SpotCard
      imageUrl={require('../../../assets/images/gt3rs.jpg')}
      avatarUrl="https://i.pravatar.cc/100?img=7"
      username="Garricastres"
      description="GT3 RS ❤️"
      timeAgo="2h"
      likes={245}
      comments={12}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginRight: 5,
  },
  username: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  time: {
    marginLeft: 'auto',
    fontSize: 12,
    color: '#999',
  },
  description: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 6,
  },
  reactions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactionText: {
    fontSize: 13,
    marginLeft: 2,
    color: '#444',
  },
});

export default LastsSpots;
