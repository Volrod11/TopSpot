import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Image, TouchableHighlight, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Animated, PanResponder, FlatList, Keyboard, Dimensions, ListRenderItem } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../types';
import { supabase } from '../../../lib/supabase';
import { useState, useEffect, useRef } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

const defaultPdp = require('../../../assets/default_pfp.png');


//Type
type PicturePageRouteProp = RouteProp<RootStackParamList, 'PicturePage'>;
type PicturePageNavigationProp = StackNavigationProp<RootStackParamList, 'PicturePage'>;


type Props = {
  navigation: PicturePageNavigationProp;
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

type Garage = {
  id: string;
  date: string,
  car_types: string[];
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

//Garages
const fetchGaragesFromDatabase = async (idProfile : string) => {
  if (idProfile) {
    const { data, error } = await supabase.from("garages").select("id, date, car_types").eq("user_id", idProfile).eq("is_finished", "FALSE");
    if (error) {
      console.error("Error fetching garage : ", error);
    }
    return(data ?? []);
  }
;}

//Comments
const fetchCommentsFromDatabase = async (idPicture : string) => {
  if (idPicture !== null) {
    const { data, error } = await supabase.from("comments").select("id, comment").eq("picture_id", idPicture);
    if (error) {
      console.error("Error fetching comments : ", error);
    }
    return(data ?? []);
  }
};

const addCommentToDatabase = async (comment : string, idPicture : string, user : User) => {
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

//Picture in garage
const addPictureInGarageToDatabase = async (idPicture : string, idGarage : string, carType : string) => {
  if (idPicture && idGarage && carType) {
    const { data, error } = await supabase
      .from('pictures_in_garages')
      .insert([{ garage_id : idGarage, picture_id: idPicture, car_type: carType}]);

    if (error) {
    console.error('Error saving picture in garage data: ' + error.message);
    }
  }
};

const PicturePage: React.FC<Props> = ({ route, navigation }) => {
  const [rowCount, setRowCount] = useState<number | null>(null);
  const [iconName, setIconName] = useState<string>();
  const [iconColor, setIconColor] = useState<string>();
  const [isLiked, setIsLiked] = useState<boolean>();
  const [user, setUser] = useState<User | null>(null);
  const [garages, setGarages] = useState<Garage[]>([]);
  const [selectedGarage, setSelectedGarage] = useState<Garage | null>(null);
  const [pictureUserProfile, setPictureUserProfile] = useState<Profile |null>(null);
  const [comment, setComment] = useState<string>('');
  const [modalCommentsVisible, setModalCommentsVisible] = useState(false);
  const [modalActionsVisible, setModalActionsVisible] = useState(false);
  const [modalGaragesVisible, setModalGaragesVisible] = useState(false);
  const [modalGarageVisible, setModalGarageVisible] = useState(false);
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
      console.log(user);
    };

    fetchUser();
  }, []);
  

  const deletePictureButton = async () => {
    // Ajouter le message à la base de données
    navigation.goBack();
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



  //Modal actions
  const toggleModalActions = () => {
    setModalActionsVisible(!modalActionsVisible);
  };

  const panResponderActions = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dy) > 20,
      onPanResponderMove: Animated.event([null, { dy: pan }], { useNativeDriver: false }),
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 50) {
          closeModalActions();
        } else {
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const closeModalActions = () => {
    Animated.timing(modalHeight, {
      toValue: Dimensions.get('window').height,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setModalActionsVisible(false));
  };


  //Modal garages
  const toggleModalGarages = () => {
    console.log("c'est ok");
    
    
    const loadGarages = async () => {
      const fetchedGarages = await fetchGaragesFromDatabase(user.id);
      setGarages(fetchedGarages);
    };
  
    loadGarages();

    
    setModalGaragesVisible(!modalGaragesVisible);
    setModalActionsVisible(!modalActionsVisible);
    console.log(modalGaragesVisible);
    

  };

  const panResponderGarages = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dy) > 20,
      onPanResponderMove: Animated.event([null, { dy: pan }], { useNativeDriver: false }),
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 50) {
          closeModalGarages();
        } else {
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const closeModalGarages = () => {
    Animated.timing(modalHeight, {
      toValue: Dimensions.get('window').height,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setModalGaragesVisible(false));
  };


  const renderItemGarages: ListRenderItem<Garage> = ({ item }) => (
    <TouchableOpacity onPress={() => openModalGarage(item)} key={item.id} style={styles.garageItem} >
      <Text>{item.date}</Text>
    </TouchableOpacity>
  );


  //Modal Garage
  const openModalGarage = (garage : Garage) => {
    setSelectedGarage(garage);
    console.log(selectedGarage.car_types);
    
    setModalGaragesVisible(false)
    setModalGarageVisible(true);
  };

  const closeModalGarage = () => {
    setModalGarageVisible(false);
  };

  const panResponderGarage = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dy) > 20,
      onPanResponderMove: Animated.event([null, { dy: pan }], { useNativeDriver: false }),
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 50) {
          closeModalGarage();
        } else {
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const choosenCarType = (idPicture : string, idGarage : string, carType : string) => {
    addPictureInGarageToDatabase(idPicture, idGarage, carType)
    setModalGarageVisible(false);
    alert("Le photo a bien été ajouté au Garage !");
  };

  const renderItemGarage: ListRenderItem<string> = ({ item }) => (
    <TouchableOpacity key={item} onPress={() => choosenCarType(idPicture, selectedGarage.id, item)} style={styles.buttonCarType}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );


  //Modal comment
  const toggleModalComments = () => {
    setModalCommentsVisible(!modalCommentsVisible);
  };



  useEffect(() => {
    const loadComments = async () => {
      const fetchedMessages = await fetchCommentsFromDatabase(idPicture);
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

  const panResponderComments = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dy) > 20,
      onPanResponderMove: Animated.event([null, { dy: pan }], { useNativeDriver: false }),
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 50) {
          closeModalComments();
        } else {
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const closeModalComments = () => {
    Animated.timing(modalHeight, {
      toValue: Dimensions.get('window').height,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setModalCommentsVisible(false));
  };


  //SQL comment

  

  const handleSubmit = async () => {
    // Ajouter le message à la base de données
    
    await addCommentToDatabase(comment, idPicture, user);

    // Récupérer les messages depuis la base de données et mettre à jour l'état local
    const updatedMessages = await fetchCommentsFromDatabase(idPicture);
    setComments(updatedMessages);

    setComment('');
  };

  const renderItemComments: ListRenderItem<Comment> = ({ item }) => (
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

  
  console.log("Les pictures : ", picture);
  
  return (
    <View style={styles.container}>
      <View style={styles.top_picture_infos}>
        <View style={styles.user_picture_infos}>
          {pictureUserProfile ? ( <Image source={pictureUserProfile.avatar_url ? { uri: pictureUserProfile.avatar_url } : defaultPdp} style={{height:30, width:30, borderRadius:50}} />) : null}
          {pictureUserProfile ? ( <Text style={styles.user_name}>{pictureUserProfile.username ? pictureUserProfile.username : 'No username available'}</Text>) : null}
        </View>
        <TouchableOpacity onPress={toggleModalActions} style={styles.btnNormal}>
          <Ionicons name="ellipsis-horizontal" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{uri : picture}} style={styles.image} />
      </View>
      <View style={styles.picture_actions}>
        <TouchableHighlight {...touchProps}>
          <Ionicons name={iconName} size={30} color={iconColor} />
        </TouchableHighlight>
        <TouchableOpacity onPress={toggleModalComments} style={styles.btnNormal}>
          <Ionicons name="chatbox-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>

      


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalActionsVisible}
        onRequestClose={toggleModalActions}
      >
        <TouchableWithoutFeedback onPress={() => setModalActionsVisible(false)}>
          <View style={styles.modalContainer}>
            <Animated.View
              style={[
                styles.modalContentContainer,
                { height: "30%" },
                { transform: [{ translateY: pan }] },
              ]}
              {...panResponderActions.panHandlers}
            >
              <TouchableOpacity onPress={toggleModalGarages} style={styles.btnActions}>
                <Text>Ajouter à un garage</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleModalComments} style={styles.btnActions}>
                <Text>Partager</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deletePictureButton} style={styles.btnActions}>
                <Text style={{color:"red"}}>Supprimer</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalGaragesVisible}
        onRequestClose={toggleModalGarages}
      >
        <TouchableWithoutFeedback onPress={() => setModalGaragesVisible(false)}>
          <View style={styles.modalContainer}>
            <Animated.View
              style={[
                styles.modalContentContainer,
                { height: "70%" },
                { transform: [{ translateY: pan }] },
              ]}
              {...panResponderGarages.panHandlers}
            >
              <View style={styles.garagesPage}>
                <FlatList
                  data={garages}
                  keyExtractor={(item) => item.id}
                  renderItem={renderItemGarages}
                  contentContainerStyle={styles.flat_list}
                  numColumns={1}
                />
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalGarageVisible}
        onRequestClose={closeModalGarage}
      >
        <TouchableWithoutFeedback onPress={() => setModalGarageVisible(false)}>
          <View style={styles.modalGarageContainer}>
              <View style={styles.garagePage}>
                <FlatList
                  data={selectedGarage?.car_types}
                  keyExtractor={(item) => item}
                  renderItem={renderItemGarage}
                  contentContainerStyle={styles.flat_list}
                  scrollEnabled={false}
                  numColumns={2}
                />
              </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalCommentsVisible}
        onRequestClose={toggleModalComments}
      >
        <TouchableWithoutFeedback onPress={() => setModalCommentsVisible(false)}>
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
                {...panResponderComments.panHandlers}
              >
                <TouchableWithoutFeedback>
                  <View style={styles.modalContent}>
                    <FlatList
                      data={comments}
                      keyExtractor={(item) => item.id}
                      renderItem={renderItemComments}
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
    btnActions: {
      width: "90%",
      height: 45,
      backgroundColor: "rgb(240,240,240)",
      margin: 5,
      borderRadius: 7,
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
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
  garageItem: {
    height: 50,
    width: 330,
    backgroundColor: "rgb(220,220,220)",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  garagesPage: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  flat_list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
  modalGarageContainer: {
    flex: 1,
    justifyContent: "center",
  },
  garagePage: {
    height: 260,
    width: 260,
    alignSelf: "center",
    alignContent: "center",
    backgroundColor: "white",
    borderRadius: 15,
  },
  buttonCarType: {
    height: 110,
    width: 110,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:  "rgb(220,220,220)",
    borderRadius: 10,
  }

});