import * as React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../../lib/supabase';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../types';
import { useState, useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';



const PlaceholderImage = require('../../../assets/images/senna.png');
type GarageNavigationProp = StackNavigationProp<RootStackParamList, 'Garage'>;

//Type
type GarageRouteProp = RouteProp<RootStackParamList, 'Garage'>;

type Props = {
    garage_id: string;
};

interface GarageData {
  pictureUrl: string;
  nbPictures: number;
  nbLikes: number;
}


//Const Function
const getMostLikedPictureUrl = async (garageId: string): Promise<GarageData | null> => {
    try {
      // 1. Obtenez toutes les pictures_id dans le garage spécifié
      const { data: garagePictures, error: garageError } = await supabase
        .from('pictures_in_garages')
        .select('picture_id')
        .eq('garage_id', garageId)
        .order('created_at', {ascending: true});

      if (garageError || !garagePictures) {
        console.error("Erreur lors de la récupération des photos du garage:", garageError);
        return null;
      }
    

      // Extrait les IDs des pictures
      const pictureIds = garagePictures.map(p => p.picture_id);
      const nbPictures = pictureIds.length;

      if (nbPictures === 0) {
        console.log("Aucune photo trouvée pour ce garage.");
      }

      // 2. Récupérez tous les likes pour les photos spécifiées
      console.log("pictureIds",pictureIds);
      
      const { data: allLikes, error: likesError } = await supabase
        .from('liked_pictures')
        .select('picture_id')
        .in('picture_id', pictureIds);

      console.log("allLikes", allLikes);
      
      
      if (likesError || !allLikes) {
        console.error("Erreur lors de la récupération des likes:", likesError);
        return null;
      }

      const nbLikes = allLikes.length
      let mostLikedPictureId: string;
      
      if (nbLikes === 0) {
        mostLikedPictureId = pictureIds[0];
      }
      else {
        // Comptez le nombre de likes pour chaque picture_id
        const likeCounts: Record<string, number> = {};
        allLikes.forEach(like => {
          if (likeCounts[like.picture_id]) {
            likeCounts[like.picture_id]++;
          } else {
            likeCounts[like.picture_id] = 1;
          }
        });

        // Trouvez l'ID de la photo avec le plus de likes
        mostLikedPictureId = Object.keys(likeCounts)
          .reduce((a, b) => likeCounts[a] > likeCounts[b] ? a : b, '-1');

          

        if (mostLikedPictureId === '-1') {
          console.log("Aucune photo likée trouvée.");
          return null;
        }
      }


      

      // 3. Obtenez l'URL de la photo la plus likée
      const { data: pictureData, error: pictureError } = await supabase
        .from('pictures')
        .select('picture')
        .eq('id', mostLikedPictureId)
        .single();

      if (pictureError || !pictureData) {
        console.error("Erreur lors de la récupération de l'URL de la photo:", pictureError);
        return null;
      }

      return {pictureUrl : pictureData.picture, nbPictures : nbPictures, nbLikes : nbLikes};
    } catch (error) {
      console.error("Erreur inattendue:", error);
      return null;
    }
};




const Garage: React.FC<Props> = ({ garage_id }) => {
    const navigation = useNavigation<GarageNavigationProp>();

    const [mostLikedPictureUrl, setMostLikedPictureUrl] = useState<null | string>(null);
    const [nbPictures, setNbPictures] = useState<number | null>(null);
    const [nbLikes, setNbLikes] = useState<null | number>(null);

    const goToGaragePage = (garage_id : string) => {
        navigation.navigate('GaragePage', { garage_id : garage_id });
    };

    useEffect(() => {
        const fetchMostLikedPicture = async () => {
          const garageData = await getMostLikedPictureUrl(garage_id);
          setMostLikedPictureUrl(garageData.pictureUrl);
          setNbPictures(garageData.nbPictures);
          setNbLikes(garageData.nbLikes);
        };
    
        fetchMostLikedPicture();
      }, []);

    return (
        <View style={styles.container}>
            <Pressable onPress={() => goToGaragePage(garage_id)} style={{height: "100%", width: "100%",}}>
                {mostLikedPictureUrl ? (
                    <View style={{flex : 1}}>
                    <Image source={{ uri: mostLikedPictureUrl }} style={styles.picture}/>
                        <View style={styles.footer}>
                            <View style={styles.info_garage}>
                                <Ionicons name="car-sport-outline" size={20} color="rgb(150,150,150)" />
                                <Text style={styles.info_number}>{nbPictures}</Text>
                            </View>
                            <View style={styles.info_garage}>
                                <Ionicons name="heart-outline" size={20} color="rgb(150,150,150)" />
                                <Text style={styles.info_number}>{nbLikes}</Text>
                            </View>
                            <View style={styles.info_garage}>
                                <Ionicons name="chatbox-outline" size={20} color="rgb(150,150,150)" />
                                <Text style={styles.info_number}>5</Text>
                            </View>
                        </View>
                    </View>
                ) : (
                    <Text>C'est vide</Text>
                )}
            </Pressable>
        </View>
    );
}


export default Garage;

const styles = StyleSheet.create({
    container: {
        height: 290,
        width: "48%",
        marginBottom: 20,
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: "white",
        margin: "1%",
    },
    footer : {
        height : 40,
        width : "100%",
        backgroundColor : "rgb(0,0,0)",
        padding : 8,
        position: "absolute",
        bottom: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    title : {
        color : "#fff",
        padding : 10,
        fontSize: 26,
        fontWeight: 'bold',
    },
    picture: {
        justifyContent: 'center',
        width: "100%",
        height: 250,
    },
    info_number : {
        color : "#fff",
        padding : 4,
        fontSize: 10,
        fontWeight: 'bold',
    },
    info_garage : {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
    }
});