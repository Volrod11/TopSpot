import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View, StyleSheet, Image, TouchableHighlight, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Animated, PanResponder, FlatList, Keyboard, Dimensions, ListRenderItem } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../types';
import { supabase } from '../../../lib/supabase';
import { useState, useEffect, useCallback, useRef } from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';

const defaultPdp = require('../../../assets/default_pfp.png');


//Type
type PicturePageRouteProp = RouteProp<RootStackParamList, 'PicturePage'>;

type Props = {
  route: PicturePageRouteProp;
};

type User = {
  id: string;
  email?: string;
  user_metadata?: {
      [key: string]: any;
  };
};

type Profile = {
  id: string;
  username: string | null;
  avatar_url: string | null;
}

type Comment = {
  id: string;
  comment: string;
};


//Const Function
const getUserIdFromPicture = async (pictureId : string): Promise<Profile | null> => {

  const {data: pictureData, error: pictureError } = await supabase
  .from('pictures')
  .select('user_id')
  .eq('id', pictureId)
  .single();

  if (pictureError) {
    console.error('Error fetching picture data:', pictureError);    
  }

  const userId = pictureData?.user_id;

  if (!userId) {
    console.error('No user ID found for the given picture ID');
  }

  const {data: profileData, error: profileError } = await supabase
  .from('profiles')
  .select('id, username, avatar_url')
  .eq('id', userId)
  .single();
  
  if (pictureError) {
    console.error('Error fetching profile data:', pictureError);    
  }

  return profileData
}

const fetchMessagesFromDatabase = async (idPicture : string) => {
  if (idPicture !== null) {
    const { data, error } = await supabase.from("comments").select("id, comment").eq("picture_id", idPicture);
    if (error) {
      console.error("Error fetching comments : ", error);
    }
    return(data ?? []);
  }
};

const addMessageToDatabase = async (comment : string, idPicture : string, user : User) => {
  if (idPicture && user) {
    const { data, error } = await supabase
      .from('comments')
      .insert([{ comment : comment, profile_id: user!.id, picture_id: idPicture}]);

    if (error) {
    console.error('Error saving comment data: ' + error.message);
    }
  }
};

const deletePictureToDatabase = async (picture_id : string) => {
  if (picture_id) {
    const { data, error } = await supabase
      .from('pictures') // Remplacez par le nom de votre table
      .delete()
      .eq('id', picture_id) 

    if (error) {
      console.error('Error deleting row:', error);
    }
  }
};

const PicturePage: React.FC<Props> = ({ route }) => {
  const [rowCount, setRowCount] = useState<number | null>(null);
  const [iconName, setIconName] = useState<string>();
  const [iconColor, setIconColor] = useState<string>();
  const [isLiked, setIsLiked] = useState<boolean>();
  const [user, setUser] = useState<User | null>(null);
  const [pictureUserProfile, setPictureUserProfile] = useState<Profile |null>(null);
  const [comment, setComment] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [comments, setComments] = useState<{ id: string; comment: string }[]>([])

  const modalHeight = useRef(new Animated.Value(0)).current;
  const pan = useRef(new Animated.Value(0)).current;
  const idPicture = route.params.idPicture;
  const picture = route.params.picture;


  useEffect(() => {
    const fetchPictureProfile = async () => {
      const profile = await getUserIdFromPicture(idPicture);
      setPictureUserProfile(profile);
    };

    fetchPictureProfile();

  }, []);
  
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
        return;
      }
      const sessionUser = data.session?.user ?? null;
      setUser(sessionUser);
    };

    fetchUser();
  }, []);
  

  const deletePictureButton = async () => {
    // Ajouter le message à la base de données
    await deletePictureToDatabase(idPicture);
  };

  useEffect(() => {
    const getIfUserLikedPicture = async (utilisateur : User|null) => {


      if (utilisateur !== null && idPicture !== null) {
  
        const { count, error } = await supabase
        .from('liked_pictures') 
        .select('*', { count: 'exact', head: true })
        .eq('picture_id', idPicture) 
        .eq('profile_id', user!.id);


        if (error) {
          console.error('Error fetching row count:', error);
          return;
        }

        setRowCount(count);
      }
    };

    if (user && idPicture) {
      getIfUserLikedPicture(user);
    }
  }, [user, idPicture]);


  useEffect(() => {
    if (rowCount !== null) {
      if (rowCount > 0) {
        setIcon("heart", "red", true);
      } else {
        setIcon("heart-outline", "white", false);
      }
    }
  }, [rowCount])

  

  const updateLikedPicture = (isLiked: boolean) => {    
    if (isLiked) {
      deletedLike();
      setIcon("heart-outline", "white", false);
    } else {
      addLike();
      setIcon("heart", "red", true);
    }
  };

  const setIcon = (name : string, color : string, is_liked : boolean) => {
    setIconName(name);
    setIconColor(color);
    setIsLiked(is_liked);
  }

  const deletedLike = async () => {
    if (idPicture && user) {
      const { data, error } = await supabase
        .from('liked_pictures') // Remplacez par le nom de votre table
        .delete()
        .eq('picture_id', idPicture) 
        .eq('profile_id', user!.id);

      if (error) {
        console.error('Error deleting row:', error);
      }
    }
  };

  const addLike = async () => {
    if (idPicture && user) {
      const { data, error } = await supabase
        .from('liked_pictures')
        .insert([{ profile_id: user!.id, picture_id: idPicture}]);

      if (error) {
      console.error('Error saving picture data: ' + error.message);
      }
    }
  };


  var touchProps = {
    activeOpacity: 1,
    style: isLiked ? styles.btnPress : styles.btnNormal,
    onPress: () => updateLikedPicture(isLiked),
  };




  //Modal comment
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };



  useEffect(() => {
    const loadComments = async () => {
      const fetchedMessages = await fetchMessagesFromDatabase(idPicture);
      setComments(fetchedMessages);
    };

    loadComments();

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      setKeyboardHeight(event.endCoordinates.height);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(modalHeight, {
      toValue: Dimensions.get('window').height * 0.8 - keyboardHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [keyboardHeight]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dy) > 20,
      onPanResponderMove: Animated.event([null, { dy: pan }], { useNativeDriver: false }),
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 50) {
          closeModal();
        } else {
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const closeModal = () => {
    Animated.timing(modalHeight, {
      toValue: Dimensions.get('window').height,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setModalVisible(false));
  };


  //SQL comment

  

  const handleSubmit = async () => {
    // Ajouter le message à la base de données
    await addMessageToDatabase(comment, idPicture, user);

    // Récupérer les messages depuis la base de données et mettre à jour l'état local
    const updatedMessages = await fetchMessagesFromDatabase(idPicture);
    setComments(updatedMessages);

    setComment('');
  };

  const renderItem: ListRenderItem<Comment> = ({ item }) => (
    <Text key={item.id} style={styles.messageItem}>{item.comment}</Text>
  );


  /**
  useEffect(() => {
    const keyboardDidHideListener: EmitterSubscription  = Keyboard.addListener('keyboardDidHide', () => {
      setModalVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      // Mettre à jour la hauteur du clavier
      setKeyboardHeight(event.endCoordinates.height);
    });
  })*/

  const messages = ["test1", "test2", "test3", "test4", "test5"];

  

  return (
    <View style={styles.container}>
      <View style={styles.top_picture_infos}>
        <View style={styles.user_picture_infos}>
          {pictureUserProfile ? ( <Image source={pictureUserProfile.avatar_url ? { uri: pictureUserProfile.avatar_url } : defaultPdp} style={{height:30, width:30, borderRadius:50}} />) : null}
          {pictureUserProfile ? ( <Text style={styles.user_name}>{pictureUserProfile.username ? pictureUserProfile.username : 'No username available'}</Text>) : null}
        </View>
        <TouchableOpacity onPress={deletePictureButton} style={styles.btnNormal}>
          <Ionicons name="ellipsis-horizontal" size={35} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image src={picture} style={styles.image} />
      </View>
      <View style={styles.picture_actions}>
        <TouchableHighlight {...touchProps}>
          <Ionicons name={iconName} size={30} color={iconColor} />
        </TouchableHighlight>
        <TouchableOpacity onPress={toggleModal} style={styles.btnNormal}>
          <Ionicons name="chatbox-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.keyboardAvoidingView}
            >
              <Animated.View
                style={[
                  styles.modalContentContainer,
                  { height: modalHeight },
                  { transform: [{ translateY: pan }] },
                ]}
                {...panResponder.panHandlers}
              >
                <TouchableWithoutFeedback>
                  <View style={styles.modalContent}>
                    <FlatList
                      data={comments}
                      keyExtractor={(item) => item.id}
                      renderItem={renderItem}
                      style={styles.messagesList}
                    />
                    <View style={styles.inputContainer}>
                      <TextInput 
                        style={styles.input}
                        placeholder='Commenter'
                        placeholderTextColor="#909090"
                        value={comment}
                        onChangeText={setComment}
                        blurOnSubmit={false}
                        onSubmitEditing={handleSubmit}
                      />
                      <TouchableOpacity
                        style={{height: 40, width: 40, marginLeft: 5}}
                        onPress={handleSubmit}
                        disabled={comment.trim().length === 0}
                      >
                        <Ionicons name="arrow-up-circle-sharp" size={40} color={ comment.trim().length > 0 ? '#ffe100' : '#505050' } />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Animated.View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}


export default PicturePage;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0D0D0D',
    },
    scrollView: {
      justifyContent: 'center',
    },
    imageContainer: {
      paddingTop: 2,
      paddingBottom: 5,
      alignItems: 'center',
    },
    image: {
      width: 350,
      height: 440,
      borderRadius: 18,
    },
    btnPress: {
      width: 35,
      height: 35,
    },
    btnNormal: {
      width: 35,
      height: 35,
    },
    picture_actions : {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      height: 30,
      paddingLeft: 35,
    },
    top_picture_infos : {
      flexDirection: 'row',
      justifyContent: 'center', //Centered vertically
      alignItems: 'center', //Centered horizontally
      flex:1/3,
      paddingLeft: 35,
      paddingRight: 35,
      paddingVertical: 10,
    },
    user_picture_infos : {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      flex: 1,
    },
    user_name: {
      color : "#fff",
      padding : 10,
      fontSize: 15,
      fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  keyboardAvoidingView: {
    width: '100%',
  },
  modalContentContainer: {
    backgroundColor: '#fff',
    paddingTop: 20,
    
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -1 },
    elevation: 5,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
  },
  submitButton: {
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comment_button: {
    padding: 15,
    borderRadius: 10,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messageItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop:10,
    borderTopWidth: 1,
    borderTopColor: '#BBBBBB',
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },

});