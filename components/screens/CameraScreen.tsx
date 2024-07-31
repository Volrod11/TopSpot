import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList, Modal } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

//Type
type CameraScreenRouteProp = RouteProp<RootStackParamList, 'TabScreen'>;

type Props = {
    route: CameraScreenRouteProp;
  };



//DB functions
const addPictureToDatabase = async (picture : string, userId : string) => {
    if (picture && userId) {
      const { data, error } = await supabase
        .from('comments')
        .insert([{ user_id : userId, picture: picture }]);
  
      if (error) {
      console.error('Error saving picture data: ' + error.message);
      }
    }
  };


const CameraScreen: React.FC<Props> = ({ route }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [photos, setPhotos] = useState<string[]>([]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const navigation = useNavigation();
  const user_id = route.params.user_id;
  const cameraRef = useRef<CameraView>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
      setPhotos(prevPhotos => [...prevPhotos, photo.uri]);
    }
  };

  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return <Text>No access to camera</Text>;
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const renderThumbnail = ({ item }: { item: string }) => (
    <TouchableOpacity onPress={() => setSelectedPhotoIndex(photos.indexOf(item))}>
      <Image source={{ uri: item }} style={styles.thumbnail} />
    </TouchableOpacity>
  );

  const handleLogAndRedirect = async (photoUri: string) => {
    await addPictureToDatabase(photoUri, user_id);
    // Here, you might want to save the photo URI to a database or handle it as needed.
    
    // Navigate to the "SettingsScreen"
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.closeButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="close" size={60} color="white" />
            </TouchableOpacity>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={toggleCameraFacing}
          >
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.snapButton} onPress={takePicture}/>
        </View>
      </CameraView>
      {photos.length > 0 && (
        <View style={styles.thumbnailContainer}>
          <FlatList
            data={photos}
            renderItem={renderThumbnail}
            keyExtractor={item => item}
            horizontal
            style={styles.flatList}
          />
        </View>
      )}
      {selectedPhotoIndex !== null && (
        <Modal
          transparent={true}
          visible={selectedPhotoIndex !== null}
          onRequestClose={() => setSelectedPhotoIndex(null)}
        >
          <View style={styles.modalContainer}>
            <Swiper
              loop={false}
              index={selectedPhotoIndex}
              onIndexChanged={index => setSelectedPhotoIndex(index)}
              showsPagination={false}
            >
              {photos.map(photo => (
                <View key={photo} style={styles.fullScreenContainer}>
                  <Image source={{ uri: photo }} style={styles.fullScreenImage} resizeMode='contain' />
                  <TouchableOpacity
                    style={styles.modalCloseButton}
                    onPress={() => setSelectedPhotoIndex(null)}
                  >
                    <Ionicons name="close" size={60} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalLogButton}
                    onPress={() => handleLogAndRedirect(photo)}
                  >
                    <Text style={styles.text}>Log</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </Swiper>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      margin: 20,
    },
    closeButton: {
        height: 60,
        width: 60,
        borderRadius: 50,
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    flipButton: {
      flex: 0.1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    snapButton: {
        height: 60,
        width: 60,
        borderRadius: 50,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
    thumbnailContainer: {
      position: 'absolute',
      bottom: 80,
      left: 10,
      right: 10,
      height: 100,
    },
    thumbnail: {
      width: 60,
      height: 60,
      margin: 5,
      borderRadius: 5,
    },
    flatList: {
      flexGrow: 0,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    },
    fullScreenContainer: {
      flex: 1,
      width: width,
      height: height,
      justifyContent: 'center',
      alignItems: 'center',
    },
    fullScreenImage: {
      width: width,
      height: height,
    },
    modalCloseButton: {
      position: 'absolute',
      top: 20,
      right: 20,
      backgroundColor: 'red',
      borderRadius: 50,
    },
    modalLogButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 50,
    },
  });
