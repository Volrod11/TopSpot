import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../types';
import { supabase } from '../../../lib/supabase';
import { useState, useEffect } from 'react';

import PagerView from 'react-native-pager-view';

const Stack = createNativeStackNavigator(); // Stack contains Screen & Navigator properties

type GarageRouteProp = RouteProp<RootStackParamList, 'GaragePage'>;

type Props = {
    route: GarageRouteProp;
};

type Picture = {
  id: string;
  car_type: string;
  pictures: {
    picture: string;
  };
}

interface GroupedPictures {
  [car_types: string]: Picture[];
}


//Const Function
const getPicturesFromPicturesInGarages = async (garage_id : string): Promise<Picture[]> => {
  if (garage_id) {
    const { data, error } = await supabase
    .from('pictures_in_garages')
    .select(`
      id,
      car_type,
      pictures (
        picture
      )
    `)
    .eq('garage_id', garage_id);

    if (error) {
        console.error("Error getting pictures from pictures_in_garages : ", error);
    }
      
    const pictures: Picture[] = data?.map((item: any) => ({
      id: item.id,
      car_type: item.car_type,
      pictures: {
        picture: item.pictures.picture,
      },
    }));
    
    return(pictures?? []);
  }
};

function groupByCarTypes(pictures : Picture[]): GroupedPictures  {
  return pictures.reduce((groupedPictures, picture) => {
    const { car_type } = picture;
    if (!groupedPictures[car_type]) {
      groupedPictures[car_type] = [];
    }
    groupedPictures[car_type].push(picture);
    return groupedPictures;
  }, {});
};


const GaragePage: React.FC<Props> = ({ route }) => {
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [groupedPictures, setGroupedPictures] = useState<GroupedPictures>();

  const garage_id = route.params.garage_id;

  useEffect(() => {
    const loadPicturesAndGroup  = async () => {
      const loadedPictures = await getPicturesFromPicturesInGarages(garage_id);
      setPictures(loadedPictures);
    };
   
    loadPicturesAndGroup ();
  }, [garage_id]);

  useEffect(() => {
    const groupPictures = async () => {
        if (pictures.length > 0) {
          // Grouper les images après avoir mis à jour l'état
          const loadedGroupedPictures = groupByCarTypes(pictures);

          setGroupedPictures(loadedGroupedPictures);
        }
    };

    groupPictures();
  }, [pictures]);

  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
      {groupedPictures ? (
        Object.keys(groupedPictures).map((carType, index) => (
          <View style={styles.cat_infos} key={carType}>
            <Text style={styles.title}>{carType}</Text>
            <PagerView style={styles.container2} initialPage={0}>
              {groupedPictures[carType].map((picture) => 
                index % 2 === 0 ? (
                  <View 
                    style={styles.categorie_left} 
                    key={picture.id}
                  >
                    <Image source={{ uri: picture.pictures.picture }} style={styles.image}/>
                    <View style={styles.infos_car} >
                      <Text style={styles.info}>McLaren</Text>
                      <Text style={styles.info}>2017</Text>
                      <Text style={styles.info}>800 Nm</Text>
                    </View>
                    <View style={styles.infos_car} >
                      <Text style={styles.info}>Senna</Text>
                      <Text style={styles.info}>800 cv</Text>

                      <Text style={styles.info}>1198 kg</Text>
                    </View>
                  </View>
                ) : (
                  <View 
                    style={styles.categorie_right} 
                    key={picture.id}
                  > 
                    <View style={styles.infos_car} >
                      <Text style={styles.info}>McLaren</Text>
                      <Text style={styles.info}>2017</Text>
                      <Text style={styles.info}>800 Nm</Text>
                    </View>
                    <View style={styles.infos_car} >
                      <Text style={styles.info}>Senna</Text>
                      <Text style={styles.info}>800 cv</Text>

                      <Text style={styles.info}>1198 kg</Text>
                    </View>
                    <Image source={{ uri: picture.pictures.picture }} style={styles.image}/>
                  </View>
                )
              )}
            </PagerView>
          </View>
        ))
      ) : (
        <Text>Chargement des données...</Text>
      )}
        
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}


export default GaragePage;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0D0D0D',
    },
    scrollView: {
      width: "100%",
      backgroundColor: '#0D0D0D',
    },
    image: {
      flex: 1,
      height: "100%",
      borderRadius: 18,
    },
    cat_infos: {
      marginTop: 30,
    },
    categorie_left: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      height: 150,
      marginBottom: 30,
    },
    categorie_right: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      height: 150,
      marginBottom: 30,
    },
    infos_car: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: 10,
    },
    info: {
      color : "#fff",
      padding : 10,
      fontSize: 15,
      fontWeight: 'bold',
    },
    title: {
      textAlign: 'center', // <-- the magic
      color : "#fff",
      padding : 10,
      fontSize: 20,
      fontWeight: 'bold',
    },
    container2: {
      height: 150,
    },
    page: {
      justifyContent: 'center',
      alignItems: 'center',
    },
});