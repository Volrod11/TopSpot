import * as React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, FlatList, Dimensions, TouchableOpacity, Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../types';
import { supabase } from '../../../lib/supabase';
import { useState, useEffect } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


import { log } from 'console';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator(); // Stack contains Screen & Navigator properties

type GarageRouteProp = RouteProp<RootStackParamList, 'GaragePage'>;

type Props = {
  route: GarageRouteProp;
};

type Car = {
  id: string;
  marque: string;
  modele: string;
  annee: number;
  chevaux: number;
  acceleration_0_100: number;
  poids: number;
  categories: string[];
};

type PictureAndCarInfos = {
  picture_id: string;
  picture_url: string;
  description: string | null;
  like_count: number;
  car: Car;
}

type Picture_by_car_type = {
  car_type: string;
  color: string;
  icon: string;
  pictures: PictureAndCarInfos[];
}

type Garage_details = {
  garage_id: string;
  username: string,
  avatar_url: string | null;
  total_likes: number;
  total_comments: number;
  pictures: Picture_by_car_type[];
}

type Completion = {
  car_type: string;
  nb_pictures: number;
}

type HeaderInfos = {
  username: string;
  avatar_url: string | null;
  like_count: number;
  garage_id: string;
  completions: Completion[];
}

type Garage_car_types = {
  car_type: string;
  icon: string;
}



const windowWidth = Dimensions.get('window').width;




//BDD
const fetchGarageDetails = async (garage_id: string) => {
  const { data, error } = await supabase
    .rpc("get_garage_details", { p_garage_id: garage_id });
  if (error) {
    console.error("Error fetching garage details: ", error);
    return null;
  }

  return data as Garage_details;
};



const fetchGarageCarTypes = async (garage_id: string) => {
  const { data, error } = await supabase
    .rpc("get_car_types_for_garage", { garage_id: garage_id });
  if (error) {
    console.error("Error fetching garage car types: ", error);
    return [];
  }

  return data as Garage_car_types[];
};



const fetchIsGarageLiked = async (garage_id: string) => {
  const { data, error } = await supabase
    .rpc("has_liked_garage", { p_garage_id: garage_id });
  if (error) {
    console.error("Error checking if garage is liked: ", error);
    return false;
  }

  return data;
}


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




const HeaderCard = ({ headerInfos, carTypes, isLikedGarage }: { headerInfos: HeaderInfos, carTypes: Garage_car_types[], isLikedGarage: boolean }) => {
  const [isLiked, setIsLiked] = useState(isLikedGarage);
  const [likeCount, setLikeCount] = useState(headerInfos.like_count);

  const handleLike = async () => {
    const { error } = await likeGarage(headerInfos.garage_id);
    if (!error) {
      setIsLiked(true);
      setLikeCount(prev => prev + 1);
    }
  };

  const handleUnlike = async () => {
    const { error } = await unlikeGarage(headerInfos.garage_id);
    if (!error) {
      setIsLiked(false);
      setLikeCount(prev => prev - 1);
    }
  };

  return (
    <View style={styles.headerCard}>
      {/* En-tête de la carte */}
      <View style={styles.header}>
        <Image source={
          headerInfos.avatar_url === null
            ? require('../../../assets/no_picture.png') :
            { uri: headerInfos.avatar_url }
        } style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{headerInfos.username}</Text>
          <Text style={styles.postTime}>Rien</Text>
        </View>
        <View style={styles.likesContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {isLiked
              ? <Pressable onPress={handleUnlike}>
                <Ionicons name="heart" size={20} color="red" />
              </Pressable> :
              <Pressable onPress={handleLike}>
                <Ionicons name="heart-outline" size={20} color="black" />
              </Pressable>}
            <Text style={styles.likesText}>{likeCount}</Text>
          </View>
          <Text style={styles.likesLabel}>Likes</Text>
        </View>
      </View>

      {/* Section des catégories */}
      <View style={styles.categoriesContainer}>
        {carTypes.map((cat, index) => {
          const completion = headerInfos.completions.find(
            comp => comp.car_type === cat.car_type
          );

          const isPresent = !!completion; // plus simple que some()
          const nbPictures = completion ? completion.nb_pictures : 0;
          const iconColor = isPresent ? '#FF6B35' : '#808080';
          return (
            <View key={index} style={styles.categoryItem}>
              <TouchableOpacity style={[styles.iconContainer, { backgroundColor: iconColor }]}>
                <FontAwesome5 name="car" size={20} color={'#fff'} />
              </TouchableOpacity>
              <Text style={styles.categoryName}>{cat.car_type}</Text>
              <Text style={[styles.categoryCount, { color: iconColor }]}>{nbPictures}/1</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const CarCard = ({ pictureAndInfos }: { pictureAndInfos: PictureAndCarInfos }) => (
  <View style={styles.card}>
    <Image source={{ uri: pictureAndInfos.picture_url }} style={styles.image} />
    <View style={styles.infoContainer}>
      <Text style={styles.carName}>{pictureAndInfos.car.marque} {pictureAndInfos.car.modele}</Text>
      <Text style={styles.description}>{pictureAndInfos.description}</Text>
      <View style={styles.textContainer}>
        <View style={styles.leftColumn}>
          <View style={styles.row}>
            <Text style={styles.label}>Puissance: </Text>
            <Text style={styles.value}>{pictureAndInfos.car.chevaux} Cv</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>   0-100 km/h: </Text>
            <Text style={styles.value}>{pictureAndInfos.car.acceleration_0_100}s</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Puissance: </Text>
            <Text style={styles.value}>{pictureAndInfos.car.chevaux} ch</Text>
          </View>
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.row}>
            <Text style={styles.label}>   Couple: </Text>
            <Text style={styles.value}>{pictureAndInfos.car.chevaux} Nm</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Poids: </Text>
            <Text style={styles.value}>{pictureAndInfos.car.poids} kg</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>   Année: </Text>
            <Text style={styles.value}>{pictureAndInfos.car.annee}</Text>
          </View>
        </View>
      </View>
    </View >
  </View >
);





const GaragePage: React.FC<Props> = ({ route }) => {
  const [garageDetails, setGarageDetails] = useState<Garage_details>(null);
  const [garageCarTypes, setGarageCarTypes] = useState<Garage_car_types[]>([]);
  const [completion, setCompletion] = useState<Completion[]>([]);
  const [isGarageLiked, setIsGarageLiked] = useState<boolean>(false);

  const garage_id = route.params.garage_id;

  useEffect(() => {
    const fetchDatas = async () => {
      const loadedGarageDetails = await fetchGarageDetails(garage_id);
      const loadedGarageCarTypes = await fetchGarageCarTypes(garage_id);
      const completionData: Completion[] = (loadedGarageDetails[0].pictures ?? []).map((item: any) => ({
        car_type: item.car_type,
        nb_pictures: item.pictures.length,
        garage_id: garage_id
      }));
      const loadIsLikedgarage = await fetchIsGarageLiked(garage_id);

      setGarageDetails(loadedGarageDetails[0]);
      setGarageCarTypes(loadedGarageCarTypes);
      setCompletion(completionData);
      setIsGarageLiked(loadIsLikedgarage);
    };

    fetchDatas();

  }, [garage_id]);


  return (
    <ScrollView style={styles.container}>
      <HeaderCard headerInfos={{
        username: garageDetails?.username || '',
        avatar_url: garageDetails?.avatar_url || null,
        like_count: garageDetails?.total_likes || 0,
        garage_id: garage_id,
        completions: completion
      }} carTypes={garageCarTypes}
        isLikedGarage={isGarageLiked} />

      {/* Affichage des photos par catégorie */}
      {garageDetails !== null ? (
        Array.isArray(garageDetails.pictures) && garageDetails.pictures.map((picture_by_car_type: any, idx: any) => (
          <View key={idx} style={styles.categoryContainer}>
            <View style={styles.categoryHeader}>
              <View style={styles.left}>
                <Text style={[styles.icon]}><FontAwesome5 name="car" size={24} color={picture_by_car_type.color} /></Text>
                <Text style={[styles.categoryTitle, { color: picture_by_car_type.color }]}>
                  {picture_by_car_type.car_type.toUpperCase()}
                </Text>
              </View>
              <View style={[styles.badge, { backgroundColor: picture_by_car_type.color }]}>
                <Text style={styles.badgeText}>
                  {picture_by_car_type.pictures.length} {picture_by_car_type.pictures.length > 1 ? "photos" : "photo"}
                </Text>
              </View>
            </View>

            <FlatList
              data={picture_by_car_type.pictures}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.picture_id}
              renderItem={({ item }) => <CarCard pictureAndInfos={item} />}
              contentContainerStyle={{ marginHorizontal: 20 }}
            />

          </View>

        ))

      ) : (
        <Text style={styles.chargement}>Chargement...</Text>
      )}
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 8,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  carCard: {
    width: windowWidth * 0.7,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1A1A1A',
    paddingBottom: 8,
  },
  card: {
    width: windowWidth * 0.8,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: 220,
  },
  infoContainer: {
    padding: 10,
  },
  carName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
    marginBottom: 4,
  },
  textContainer: {
    flexDirection: 'row', // Sépare les colonnes horizontalement
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  leftColumn: {
    flex: 1, // Occupe la moitié de l'espace horizontal
    flexDirection: 'column',
    marginRight: 10,
    alignSelf: 'flex-start',
  },
  rightColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 13,
    color: '#555',
  },
  description: {
    paddingBottom: 10,
  },
  value: {
    fontSize: 13,
    fontWeight: '600',
    color: '#007AFF', // bleu style iOS
  },
  chargement: {
    alignSelf: 'center',
  },
  headerCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
    fontWeight: 'bold',
    fontSize: 16,
  },
  postTime: {
    fontSize: 12,
    color: 'gray',
  },
  likesContainer: {
    alignItems: 'center',
  },
  likesText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'red',
  },
  likesLabel: {
    fontSize: 12,
    color: 'gray',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  categoryItem: {
    alignItems: 'center',
    width: 80,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryCount: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default GaragePage;