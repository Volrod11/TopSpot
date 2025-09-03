import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  ListRenderItem,
} from "react-native";
import {  useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { supabase } from "../../lib/supabase";
import {  HomeScreenStackParamList, PicturesStackParamList } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type PicturesPageProps = {
  user_id: string | null;
  brand_filter?: string | null;
  period?: string | null;
  sort_by?: string | null;
  query?: string | null;
};

type NavigationProp = StackNavigationProp<
  PicturesStackParamList,
  "PicturesPage"
>;

type Picture = {
  picture_id: string;
  picture_url: string;
};

/*
Fetch pictures from Supabase
user_id uuid default null,
brand_filter text default null,
period text default null,        -- 'week', 'month', ou null
sort_by text default null,       -- 'likes', 'comments', ou null
query text default null,
*/
const fetchPictures = async (
  user_id?: string | null,
  brand_filter?: string | null,
  period?: string | null,
  sort_by?: string | null,
  query?: string | null
) => {
  console.log("query : ", query);

  const { data, error } = await supabase.rpc("search_filtered_pictures", {
    p_user_id: user_id,
    p_brand_filter: brand_filter,
    p_period: period,
    p_sort_by: sort_by,
    p_query: query,
  });
  if (error) {
    console.error("Error fetching pictures: ", error);
    return [];
  }

  return data as Picture[];
};

const PicturesPage = ({
  user_id = null,
  brand_filter = null,
  period = null,
  sort_by = null,
  query = null,
}: PicturesPageProps) => {

  const navigation = useNavigation<NativeStackNavigationProp<HomeScreenStackParamList>>();

  const [pictures, setPictures] = useState<Picture[]>([]);

  const goToPicturePage = (idPicture: string, picture: string) => {
    navigation.navigate("PicturePage", {
      idPicture: idPicture,
      picture: picture,
    });
  };

  useEffect(() => {
    console.log("query : ", query);

    async function getPictures() {
      const fetchedPictures = await fetchPictures(
        user_id,
        brand_filter,
        period,
        sort_by,
        query
      );
      setPictures(fetchedPictures);
    }

    getPictures();
  }, []);

  const renderItem: ListRenderItem<Picture> = ({ item }) => (
    <Pressable
      key={item.picture_id}
      onPress={() => goToPicturePage(item.picture_id, item.picture_url)}
      style={styles.bouton}
    >
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
};

export default PicturesPage;

const styles = StyleSheet.create({
  picturesPage: {
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
