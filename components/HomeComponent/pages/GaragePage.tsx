import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../types';
import { supabase } from '../../../lib/supabase';
import { useState, useEffect } from 'react';

import PagerView from 'react-native-pager-view';
import { get } from 'http';

const Stack = createNativeStackNavigator(); // Stack contains Screen & Navigator properties

type GarageRouteProp = RouteProp<RootStackParamList, 'GaragePage'>;

type Props = {
    route: GarageRouteProp;
};

type Picture = {
  id: string;
  pictures: {
    picture: string;
  };
}

type PictureAndCarInfos = {
  id: string;
  pictures: {
    picture: string;
  };
  voitures: {
    id: string;
    marque: string;
    modele: string;
    annee: Int16Array;
    chevaux: Int16Array;
    acceleration_0_100: Float16Array;
    poids: Int16Array;
  };
  voiture_categorie: {
    categorie: string;
  };
}

interface GroupedPictures {
  [car_types: string]: PictureAndCarInfos[];
}


//Const Function
const getPicturesAndCarsInfosFromPicturesInGarages = async (garage_id : string): Promise<PictureAndCarInfos[]> => {
  console.log("garage_id: ", garage_id);
  

  if (garage_id) {
    console.log("ok");
    
    const { data, error } = await supabase
    .from('pictures_in_garages')
    .select(`
      id,
      pictures (
        picture,
        voitures(
          id,
          marque,
          modele,
          annee,
          chevaux,
          acceleration_0_100,
          poids,
          voiture_categorie (
            categorie
          )
        )
      )
    `)
    .eq('garage_id', garage_id);

    if (error) {
        console.error("Error getting pictures from pictures_in_garages : ", error);
    }
      
    console.log("data: ", data);
    
    const picturesAndCarsInfos: PictureAndCarInfos[] = data?.map((item: any) => ({
      id: item.id,
      pictures: {
        picture: item.pictures?.picture ?? "",
      },
      voitures: {
        id : item.pictures.voitures?.id ?? "",
        marque : item.pictures.voitures?.marque ?? "",
        modele : item.pictures.voitures?.modele ?? "",
        annee : item.pictures.voitures?.annee ?? "",
        chevaux : item.pictures.voitures?.chevaux ?? "",
        acceleration_0_100 : item.pictures.voitures?.acceleration_0_100 ?? "",
        poids : item.pictures.voitures?.poids ?? ""
      },
      voiture_categorie: {
        categorie : item.pictures.voitures.voiture_categorie?.categorie ?? ""
      }
    }));

    console.log("picturesAndCarsInfos: ", picturesAndCarsInfos);
    
    
    return(picturesAndCarsInfos?? []);
  }
};


/*const getCarsInfosFromPictures = async (pictures: Picture[]): Promise<Car[]> => {
  if (pictures.length > 0) {
    console.log("Pictures to get cars infos from: ", pictures);
    

    const ids_pictures = pictures.map(picture => picture.id);
    const { data : cars_ids_data, error : cars_ids_error } = await supabase
      .from('pictures')
      .select('car_id')
      .in('id', ids_pictures);

    if (cars_ids_error) {
      console.error("Error getting cars ids from pictures: ", cars_ids_error);
      return [];
    }

    console.log("cars_ids_data : ", cars_ids_data);
    

    const lst_cars_ids = cars_ids_data?.map((item: any) => item.car_id) ?? [];

    const { data : cars_infos_data, error : cars_infos_error } = await supabase
      .from('voitures')
      .select('*, voiture_categorie(categorie), pictures(picture)')
      .in('id', lst_cars_ids);

    if (cars_infos_error) {
      console.error("Error getting cars infos from voitures: ", cars_infos_error);
      return [];
    }

    console.log("Cars infos data: ", cars_infos_data);
    
    return cars_infos_data as Car[];
  }
  return [];
}*/-


function groupByCarTypes(picturesAndCarsInfos : PictureAndCarInfos[]): GroupedPictures  {
  return picturesAndCarsInfos.reduce((groupedPictures, pictureAndCarInfos) => {
    const { voiture_categorie } = pictureAndCarInfos;
    const categorie = voiture_categorie.categorie;
    if (!groupedPictures[categorie]) {
      groupedPictures[categorie] = [];
    }
    groupedPictures[categorie].push(pictureAndCarInfos);
    return groupedPictures;
  }, {});
};


const GaragePage: React.FC<Props> = ({ route }) => {
  const [picturesAndcarsInfos, setPicturesAndcarsInfos] = useState<PictureAndCarInfos[]>([]);
  const [groupedPictures, setGroupedPictures] = useState<GroupedPictures>();
  //const [carsInfos, setCarsInfos] = useState<Car[]>([]);

  const garage_id = route.params.garage_id;

  useEffect(() => {
    const loadPicturesAndGroup  = async () => {
      const loadedPicturesAndInfos = await getPicturesAndCarsInfosFromPicturesInGarages(garage_id);
      setPicturesAndcarsInfos(loadedPicturesAndInfos);
    };
   
    loadPicturesAndGroup ();
  }, [garage_id]);

  

  /*useEffect(() => {
    const loadCarsInfos = async () => {
      if (pictures.length > 0) {
        const loadedcarsInfos = await getCarsInfosFromPictures(pictures);
        setCarsInfos(loadedcarsInfos);
      }
    };

    loadCarsInfos();
  },[pictures]);*/

  /*useEffect(() => {
    const groupPictures = async () => {
        if (pictures.length > 0) {
          // Grouper les images après avoir mis à jour l'état
          const loadedGroupedPictures = groupByCarTypes(carsInfos);

          setGroupedPictures(loadedGroupedPictures);
        }
    };

    groupPictures();
  }, [pictures]);*/
  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
      {groupedPictures ? (
        Object.keys(groupedPictures).map((carType, index) => (
          <View style={styles.cat_infos} key={carType}>
            <Text style={styles.title}>{carType}</Text>
            <PagerView style={styles.container2} initialPage={0}>
              {groupedPictures[carType].map((pictureAndCarInfos) => 
                index % 2 === 0 ? (
                  <View 
                    style={styles.categorie_left} 
                    key={pictureAndCarInfos.id}
                  >
                    <Image source={{ uri: pictureAndCarInfos.pictures.picture }} style={styles.image}/>
                    <View style={styles.infos_car} >
                      <Text style={styles.info}>{pictureAndCarInfos.voitures.marque}</Text>
                      <Text style={styles.info}>{pictureAndCarInfos.voitures.annee}</Text>
                      <Text style={styles.info}>{pictureAndCarInfos.voitures.acceleration_0_100} s</Text>
                    </View>
                    <View style={styles.infos_car} >
                      <Text style={styles.info}>{pictureAndCarInfos.voitures.modele}</Text>
                      <Text style={styles.info}>{pictureAndCarInfos.voitures.chevaux} cv</Text>
                      <Text style={styles.info}>{pictureAndCarInfos.voitures.poids} kg</Text>
                    </View>
                  </View>
                ) : (
                  <View 
                    style={styles.categorie_right} 
                    key={pictureAndCarInfos.id}
                  > 
                    <View style={styles.infos_car} >
                      <Text style={styles.info}>{pictureAndCarInfos.voitures.marque}</Text>
                      <Text style={styles.info}>{pictureAndCarInfos.voitures.annee}</Text>
                      <Text style={styles.info}>{pictureAndCarInfos.voitures.acceleration_0_100} s</Text>
                    </View>
                    <View style={styles.infos_car} >
                      <Text style={styles.info}>{pictureAndCarInfos.voitures.modele}</Text>
                      <Text style={styles.info}>{pictureAndCarInfos.voitures.chevaux} cv</Text>

                      <Text style={styles.info}>{pictureAndCarInfos.voitures.poids} kg</Text>
                    </View>
                    <Image source={{ uri: pictureAndCarInfos.pictures.picture }} style={styles.image}/>
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