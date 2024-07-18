import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View, StyleSheet, Image, Pressable, ImageBackground, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { supabase } from '../../../lib/supabase';
import { RootStackParamList } from '../../../types';
import { StackScreenProps } from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'PicturesPage'>;
};
type PicturesPageNavigationProp = StackNavigationProp<RootStackParamList, 'PicturePage'>;


const PlaceholderImageR8 = require('../../../assets/images/r8.png');
const PlaceholderImageF150 = require('../../../assets/images/F150.png');
const PlaceholderImageLigier = require('../../../assets/images/ligier.png');
const PlaceholderImageSenna = require('../../../assets/images/senna.png');

const PicturesPage: React.FC = () => {
  const [pictures, setPictures] = useState<{ picture: string }[]>([])
  const navigation = useNavigation<PicturesPageNavigationProp>();
  
  const goToPicturePages = (idImage: string) => {
    navigation.navigate('PicturePage', { idImage : idImage });
  };

  async function getPicturesFromUser() {
    const { data } = await supabase.from("pictures").select("picture");
    setPictures(data ?? []);
  }

  getPicturesFromUser();
    return (
      <View style={styles.picturesPage}>
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          {pictures.map((image: { picture: string }) => (
            <Pressable onPress={() => goToPicturePages(image.picture)} style={styles.bouton}>
              <Image src={image.picture} style={styles.image} />
            </Pressable>
          ))}
        </View>
        </ScrollView>
        <StatusBar style="auto" />
      </View>
      
    );
}

export default PicturesPage;

const styles = StyleSheet.create({
  picturesPage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#0D0D0D",
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    backgroundColor: '#0D0D0D',
  },
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  bouton: {
    width: "32.93%",
    height: 200,
    margin: "0.2%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 0,
  },
  
});