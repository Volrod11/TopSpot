import React, { useState, useRef } from 'react';
import { View, Text, Button,StyleSheet, TouchableOpacity, Image, Dimensions, FlatList, Modal } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import { RouteProp } from '@react-navigation/native';
import { CameraScreenStackParamList } from '../../types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';


import recognizeModel from '../../api/carRecognition/carRecognitionApi';
import Swiper from 'react-native-swiper';

const Tab = createStackNavigator<RootStackParamList>();
const { width, height } = Dimensions.get('window');

//Type
type CameraScreenRouteProp = RouteProp<CameraScreenStackParamList, 'CameraScreen'>;
type CameraScreenNavigationProp = StackNavigationProp<CameraScreenStackParamList, 'PhotoDetailsScreen'>;

type RootStackParamList = {
    CameraScreen: { user_id: string };
    PhotoDetailsScreen: { picture: string, user_id: string };
}

type Props = {
    route: CameraScreenRouteProp;
};



//DB functions
const addPictureToDatabase = async (picture : string, userId : string) => {
    if (picture && userId) {
      const { data, error } = await supabase
        .from('pictures')
        .insert([{ user_id : userId, picture: picture }]);
  
      if (error) {
      console.error('Error saving picture data: ' + error.message);
      }
    }
  };


const CameraScreen: React.FC<{ route: CameraScreenRouteProp }> = ({ route }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [photos, setPhotos] = useState<string[]>([]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [currentPhoto, setCurrentPhoto] = useState<string |null>(null);

  const navigation = useNavigation<CameraScreenNavigationProp>();
  const { user_id } = route.params;
  console.log(user_id);
  
  const cameraRef = useRef<CameraView>(null);

  const fetchMarques = async () => {
    const { data, error } = await supabase
    .from('voitures')
    .select('marque', { count: 'exact', head: false })
    .order('marque', { ascending: true })
    .neq('marque', null);

    const unique = [...new Set(data.map(row => row.marque))];
    return unique;
  }

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
    // Camera permissions are not granted yet.
    return (
      <View style={styles.containerPerm}>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function closeCamera() {
    navigation.goBack();
    setPhotos([]);
  }

  const renderThumbnail = ({ item }: { item: string }) => (
    <TouchableOpacity onPress={() => {
        setSelectedPhotoIndex(photos.indexOf(item));
        setCurrentPhoto(item); 
    }} style={styles.imageContainer}>
      <Image source={{ uri: item }} style={styles.thumbnail} />
    </TouchableOpacity>
  );

  const handleLogAndRedirect = async () => {
    if (currentPhoto) {
      navigation.navigate('PhotoDetailsScreen', { picture: currentPhoto, user_id: user_id });
      setPhotos([]);
      setSelectedPhotoIndex(null);
    }
    
    /*if (currentPhoto) {
        await addPictureToDatabase(currentPhoto, user_id);
        setPhotos([]);
        setSelectedPhotoIndex(null);
    }   */
  };



  return (
    <View style={styles.container}>
        <View style={styles.cameraContainer}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={closeCamera}
                    >
                        <Ionicons name="close" size={30} color="white" />
                    </TouchableOpacity>
                    <View style={styles.bottomButtonContainer}>
                        <View style={styles.snapButtonWrapper}>
                            <TouchableOpacity style={styles.snapButton} onPress={takePicture} >
                                <Ionicons name="radio-button-on" size={100} color="rgba(255,255,255,0.8)" />  
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.flipButton}
                            onPress={toggleCameraFacing}
                        >
                            <MaterialCommunityIcons name="camera-flip-outline" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </CameraView>
      </View>
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
              onIndexChanged={index => {
                setSelectedPhotoIndex(index);
                setCurrentPhoto(photos[index]);
            }}
              showsPagination={false}
            >
              {photos.map(photo => (
                <View key={photo} style={styles.fullScreenContainer}>
                  <Image source={{ uri: photo }} style={styles.fullScreenImage} resizeMode='contain' />
                </View>
              ))}
            </Swiper>
            <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setSelectedPhotoIndex(null)}
            >
                <Ionicons name="close" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.modalLogButton}
                onPress={handleLogAndRedirect}
            >
                <Text style={styles.text}>Add picture</Text>
                <Ionicons name="arrow-forward" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
    containerPerm: {
      flex: 1,
      justifyContent: 'center',
      alignContent: "center",
    },
    container: {
      flex: 1,
      backgroundColor: '#0D0D0D'
    },
    cameraContainer: {
        alignSelf: 'center',
        width: "95%",
        height: "80%",
        marginTop: 50,
        borderRadius: 20,
        overflow: "hidden",
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      margin: 20,
      marginBottom: 0,
    },
    closeButton: {
        height: 30,
        width: 30,
        marginTop: 2,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    flipButton: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: "rgba(100,100,100,0.6)",
        position: 'absolute',
        right: width / 5 - 40, // Adjust this value if necessary
        justifyContent: "center",
        alignItems : "center",
    },
    snapButtonWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    snapButton: {
        height: 100,
        width: 100,
        alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
    thumbnailContainer: {
      position: 'absolute',
      bottom: 0,
      left: 20,
      right: 10,
      height: 100,
    },
    imageContainer:
    {
        alignItems: "center",
        justifyContent: "center",
        height:47,
        width:47,
        backgroundColor:"white",
        borderRadius: 5,
        margin: 5,
    },
    thumbnail: {
      width: 45,
      height: 45,
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
        alignSelf: 'center',
        width: "95%",
        height: "80%",
        marginTop: 50,
        borderRadius: 20,
        overflow: "hidden",
    },
    fullScreenImage: {
      flex: 1,
    },
    modalCloseButton: {
      position: 'absolute',
      top: 50,
      right: 20,
      borderRadius: 50,
      marginTop: 20,
    },
    modalLogButton: {
      position: 'absolute',
      flexDirection: "row",
      justifyContent: "space-between",
      bottom: 45,
      right: 20,
      backgroundColor: '#ffe100',
      paddingVertical: 10,
      paddingHorizontal: 13,
      borderRadius: 50,
    },
  });
