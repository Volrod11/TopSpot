import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const profiles = [
  {
    id: '1',
    username: 'CarHunter92',
    avatar: 'https://i.pravatar.cc/100?img=5',
  },
  {
    id: '2',
    username: 'LamboGirl',
    avatar: 'https://i.pravatar.cc/100?img=4',
  },
  {
    id: '3',
    username: 'SpeedQueen',
    avatar: 'https://i.pravatar.cc/100?img=3',
  },
  {
    id: '4',
    username: 'SuperCarAlex',
    avatar: 'https://i.pravatar.cc/100?img=2',
  },
];

const SuggestedProfiles = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suggestions</Text>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.profileCard}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text style={styles.username}>@{item.username}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Suivre</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  profileCard: {
    width: 120,
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 10,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginBottom: 6,
  },
  username: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  button: {
    backgroundColor: '#764DA4',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default SuggestedProfiles;
