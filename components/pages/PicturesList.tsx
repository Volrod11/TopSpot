import { useCallback, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  ListRenderItem,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { supabase } from "../../lib/supabase";
import { HomeScreenStackParamList, PicturesStackParamList, Picture } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LoadingSpinner from "../HomeComponent/components/LoadingSpinner";

type PicturesListProps = {
  fetchImages: (limit: number, offset: number) => Promise<Picture[]>;
  resetKey?: string;
};

type NavigationProp = StackNavigationProp<
  PicturesStackParamList,
  "PicturesPage"
>;



const PicturesList = ({ fetchImages, resetKey }: PicturesListProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<PicturesStackParamList, "PicturesPage">>();
  const limit = 25;
  const addedPictureIds = useRef<Set<string>>(new Set());

  const [pictures, setPictures] = useState<Picture[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [loadingPictures, setLoadingPictures] = useState(false);
  const [hasMorePictures, setHasMorePictures] = useState(true);


  useEffect(() => {
    fetchImages(limit, 0)
      .then(setPictures)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [fetchImages]);


  const loadPictures = useCallback(async () => {
    if (loadingPictures || !hasMorePictures) return;

    setLoadingPictures(true);
    try {
      const newPictures = await fetchImages(limit, offset);

      const filtered = newPictures.filter(p => !addedPictureIds.current.has(p.picture_id));
      filtered.forEach(p => addedPictureIds.current.add(p.picture_id));
      setPictures(prev => [...prev, ...filtered]);

      if (newPictures.length > 0) setOffset(prev => prev + limit);

      if (newPictures.length < limit) setHasMorePictures(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPictures(false);
    }
  }, [fetchImages, loadingPictures, hasMorePictures]);

  useEffect(() => {
    setPictures([]);
    setOffset(0);
    setHasMorePictures(true);
    addedPictureIds.current.clear();
    setLoading(true);

    fetchImages(limit, 0)
      .then((data) => {
        setPictures(data);
        if (data.length < limit) setHasMorePictures(false);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [resetKey, fetchImages]);


  const goToPicturePage = (idPicture: string, picture: string) => {
    navigation.navigate("PicturePage", {
      idPicture: idPicture,
      picture: picture,
    });
  };



  if (loading) return (<LoadingSpinner />);



  const renderItem: ListRenderItem<Picture> = ({ item }) => (
    <Pressable
      key={item.picture_id}
      onPress={() => goToPicturePage(item.picture_id, item.picture_url)}
      style={styles.bouton}
    >
      <Image source={{ uri: item.picture_url || "https://aosttdzezofbyaimkdnd.supabase.co/storage/v1/object/public/pictures/a110r.jpg" }} style={styles.image} />
    </Pressable>
  );

  return (
    <View style={styles.picturesList}>
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
        onEndReached={loadPictures}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingPictures ? <LoadingSpinner /> : null}
      />
      <StatusBar style="auto" />
    </View>
  );
};

export default PicturesList;

const styles = StyleSheet.create({
  picturesList: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    justifyContent: "center",
  },
  bouton: {
    flex: 1 / 3,
    margin: 1,
    aspectRatio: 1, // carré
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
