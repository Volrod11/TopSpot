import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Image, Pressable, FlatList, ListRenderItem  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { supabase } from '../../lib/supabase';
import { RootStackParamList } from '../../types';

type PicturesPageProps  = {
  user_id?: string;
};
type PicturesPageNavigationProp = StackNavigationProp<RootStackParamList, 'PicturePage'>;


type Picture = {
  picture_id: string;
  picture_url: string;
};


const fetchPictures = async (user_id: string ) => {
  console.log("Fetching pictures for user_id: ", user_id);
  
  const { data, error } = await supabase
  .rpc("get_user_pictures", { p_user_id: user_id });
  if (error) {
    console.error("Error fetching pictures: ", error);
    return [];
  }

  return data as Picture[];
}


const PicturesPage: React.FC<PicturesPageProps> = ({user_id = null}) => {
  const [pictures, setPictures] = useState<Picture[]>([])


  const navigation = useNavigation<PicturesPageNavigationProp>();
  
  const goToPicturePages = (idPicture : string, picture: string) => {    
    navigation.navigate('PicturePage', { idPicture : idPicture, picture : picture });
  };

  useEffect(() => {
    async function getPictures() {
      const fetchedPictures = await fetchPictures(user_id);
      setPictures(fetchedPictures);
    }

    getPictures();
  }, []);
  

  useEffect(() => {
    console.log("Pictures fetched: ", pictures);
  }, [pictures]);

  const renderItem: ListRenderItem<Picture> = ({ item }) => (
    <Pressable key={item.picture_id} onPress={() => goToPicturePages(item.picture_id, item.picture_url)} style={styles.bouton}>
      <Image source={{ uri: item.picture_url }} style={styles.image} />
    </Pressable>
  );

  return (
    <View style={styles.picturesPage}>
      <FlatList
        data={pictures}
        keyExtractor={(item) => item.picture_id}
        renderItem={renderItem}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={21}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        numColumns={3}
      />
      <StatusBar style="auto" />
    </View>
  );
}

export default PicturesPage;

const styles = StyleSheet.create({
  picturesPage: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    justifyContent: 'center',
  },
  bouton: {
    flex: 1/3,
    margin: 1,
    aspectRatio: 1, // carré
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  
});