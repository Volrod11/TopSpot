import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Image, Pressable, FlatList, ListRenderItem  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { supabase } from '../../../lib/supabase';
import { RootStackParamList } from '../../../types';

type PicturesPageProps  = {
  user_id?: string;
};
type PicturesPageNavigationProp = StackNavigationProp<RootStackParamList, 'PicturePage'>;


type Picture = {
  id: string;
  picture: string;
};

const PicturesPage: React.FC<PicturesPageProps> = ({user_id = null}) => {
  const [pictures, setPictures] = useState<{ id: string; picture: string }[]>([])


  const navigation = useNavigation<PicturesPageNavigationProp>();
  
  const goToPicturePages = (idPicture : string, picture: string) => {
    console.log(navigation);
    
    navigation.navigate('PicturePage', { idPicture : idPicture, picture : picture });
  };

  useEffect(() => {
    async function getPicturesFromUser() {
      if (user_id === null) {
        const { data, error } = await supabase.from("pictures").select("id, picture");
        if (error) {
          console.error("Error fetching pictures: ", error);
        }

        setPictures(data ?? []);
      } else if(user_id !== null) {
        const { data, error } = await supabase.from("pictures").select("id, picture").eq('user_id', user_id);
        if (error) {
          console.error("Error fetching pictures: ", error);
        }

        setPictures(data ?? []);
      }
      
    }

    getPicturesFromUser();
  }, []);
  

  const renderItem: ListRenderItem<Picture> = ({ item }) => (
    <Pressable key={item.id} onPress={() => goToPicturePages(item.id, item.picture)} style={styles.bouton}>
      <Image source={{ uri: item.picture }} style={styles.image} />
    </Pressable>
  );

  return (
    <View style={styles.picturesPage}>
      <FlatList
        data={pictures}
        keyExtractor={(item) => item.id}
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
    backgroundColor: '#0D0D0D',
  },
  container: {
    justifyContent: 'center',
  },
  bouton: {
    flex: 1/3,
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  
});