import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CityRegion, HomeScreenStackParamList, NearbyCar } from '../../../types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


type NearbyCarsProps = {
  nearbyCar1: NearbyCar;
  nearbyCar2: NearbyCar;
  cityRegion: CityRegion;
};

const SpotCard = ({
  imageUrl,
  avatarUrl,
  username,
  voiture,
  city,
  likes,
  comments
}) => {
  const defaultAvatar = avatarUrl ?? "https://i.pravatar.cc/100?img=9";

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <View style={styles.header}>
          <Image source={{ uri: defaultAvatar }} style={styles.avatar} />
          <Text style={styles.username}>{username}</Text>
        </View>
        <View>
          <Text style={styles.carName} numberOfLines={1} ellipsizeMode="tail">
            {voiture}
          </Text>
          <Text style={styles.city} numberOfLines={1} ellipsizeMode="tail">
            {city}
          </Text>
        </View>
        <View style={styles.reactions}>
          <Ionicons name="heart" size={16} color="#E74C3C" />
          <Text style={styles.reactionText}>{likes}</Text>
          <Ionicons name="chatbubble" size={16} color="#3498DB" style={{ marginLeft: 10 }} />
          <Text style={styles.reactionText}>{comments}</Text>
        </View>
      </View>
    </View>
  )
};

export default function NearbyCars({ nearbyCar1, nearbyCar2, cityRegion }: NearbyCarsProps) {
  const navigation = useNavigation<NativeStackNavigationProp<HomeScreenStackParamList>>();
  const fullNameCar1 = [nearbyCar1.marque, nearbyCar1.modele, nearbyCar1.variante]
    .filter(Boolean)
    .join(" ");

  const fullNameCar2 = [nearbyCar2.marque, nearbyCar2.modele, nearbyCar2.variante]
    .filter(Boolean)
    .join(" ");





  return (
    <View>
      <Pressable onPress={() =>
        navigation.navigate('PicturesPage', {
          fetchFunction: "nearby",
          city: cityRegion.city,
          region: cityRegion.region
        })
      }>
        <SpotCard
          imageUrl={nearbyCar1.url}
          avatarUrl={nearbyCar1.avatar_url}
          username={nearbyCar1.username}
          voiture={fullNameCar1}
          city={nearbyCar1.city}
          likes={nearbyCar1.likes_count}
          comments={nearbyCar1.comments_count}
        />
        <SpotCard
          imageUrl={nearbyCar2.url}
          avatarUrl={nearbyCar2.avatar_url}
          username={nearbyCar2.username}
          voiture={fullNameCar2}
          city={nearbyCar2.city}
          likes={nearbyCar2.likes_count}
          comments={nearbyCar2.comments_count}
        />
      </Pressable>
    </View>
  )
};

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
    width: 100,
    height: "100%",
    flexShrink: 0,
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
    width: 26,
    height: 26,
    borderRadius: 11,
    marginRight: 5,
    borderWidth: 1, borderColor: '#eee'
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
  voitureAndCity: {
    fontSize: 15,
    marginTop: 4,
    marginBottom: 6,
    fontWeight: '600',
    color: '#111',
    flexShrink: 1,
    flexWrap: 'nowrap',
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
  carName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
    marginTop: 4,
  },
  city: {
    fontSize: 13,
    color: '#555',
    marginBottom: 6,
  },

});