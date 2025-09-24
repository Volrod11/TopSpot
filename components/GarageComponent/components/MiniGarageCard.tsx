import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreenStackParamList } from '../../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';



const MiniGarageCard = ({ garage_with_pictures }) => {

  const navigation = useNavigation<NativeStackNavigationProp<HomeScreenStackParamList>>();

  return (
    <View style={styles.card}>
      <Pressable onPress={() => navigation.navigate('GaragePage', { garage_id : garage_with_pictures.garage_id })}>
        {/* 4 photos en grille 2x2 */}
        <View style={styles.photoGrid}>
          {Array.isArray(garage_with_pictures.top_pictures_by_category) && garage_with_pictures.top_pictures_by_category.map((_pic: any, idx: any) => (
            <Image key={idx} source={
              _pic.id === null
                ? require('../../../assets/no_picture.png')
                : { uri: _pic.url }
            } style={styles.photo} />
          ))}
        </View>

        {/* Infos utilisateur */}
        <View style={styles.infoRow}>
          <Image source={garage_with_pictures.avatar_url === null
            ? require('../../../assets/no_picture.png') : { uri: garage_with_pictures.avatar_url }} style={styles.avatar} />
          <Text style={styles.username}>@{garage_with_pictures.username}</Text>
        </View>

        {/* Footer avec catégories et likes */}
        <View style={styles.footer}>
          <Text style={styles.categoriesText}>{garage_with_pictures.nb_categories}/4</Text>
          <View style={styles.likesRow}>
            <Ionicons name="heart" size={16} color="red" />
            <Text style={styles.likesText}>{garage_with_pictures.total_likes}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '49%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  photo: {
    width: '49%',
    height: 1,
    aspectRatio: 1,
    resizeMode: 'cover',
    marginBottom: 2,
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },
  username: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoriesText: {
    fontSize: 12,
    color: '#666',
  },
  likesRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#333',
  },
});

export default React.memo(MiniGarageCard);
