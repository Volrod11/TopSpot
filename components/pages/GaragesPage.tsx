import * as React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";

import MiniGarageCard from "../GarageComponent/components/MiniGarageCard";
import MyGarageCard from "../GarageComponent/components/MyGarageCard";
import { useUser } from "../../context/UserContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { GaragesStackParamList } from "../../types";


//Type
type GaragesPageNavigationProp = StackNavigationProp<
  GaragesStackParamList,
  "GaragesPage"
>;

type GaragesPageProps = {
  user_id: string | null;
  show_my_garage: boolean;
  garage_type: string;
  is_finished?: boolean;
  sort_by?: string | null;
  query?: string | null;
  onCountChange?: (count: number) => void;
};

type Picture = {
  id: string | null;
  url: string | null;
  car_type: string;
};

type Garage_with_pictures = {
  garage_id: string;
  username: string;
  avatar_url: string | null;
  nb_categories: number;
  total_likes: number;
  total_comments: number;
  top_pictures_by_category: Picture[];
};

//Const Function
const fetchGaragesFromDatabase = async (
  user_id: string | null,
  is_empty_garage: boolean,
  duration_type: string,
  is_finished: boolean,
  sort_by: string | null,
  query: string | null
) => {

  const { data: Garage_with_pictures, error } = await supabase.rpc(
    "get_garages_and_car_types_with_details",
    {
      p_profile: user_id,
      p_empty_garage: is_empty_garage,
      p_duration_type: duration_type,
      p_is_garage_finished: is_finished,
      p_sort_by: sort_by,
      p_query: query,
    }
  );
  if (error) {
    console.error("Error fetching garages : ", error);
  }

  console.log("Garages fetched: ", Garage_with_pictures);

  return Garage_with_pictures ?? [];
};

const GaragesPage: React.FC<GaragesPageProps> = ({
  user_id = null,
  show_my_garage = null,
  garage_type = null,
  is_finished = null,
  sort_by = null,
  query = null,
  onCountChange,
}: GaragesPageProps) => {
  const [garages, setGarages] = useState<Garage_with_pictures[]>([]);
  const [myGarage, setMyGarage] = useState<Garage_with_pictures[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<GaragesPageNavigationProp>();
  const { currentUserId } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedMyGarage = show_my_garage
        ? await fetchGaragesFromDatabase(
            currentUserId,
            show_my_garage,
            garage_type,
            false,
            null,
            null
          )
        : [];
      const fetchedGarages = await fetchGaragesFromDatabase(
        user_id,
        false,
        garage_type,
        is_finished,
        sort_by,
        query
      );

      console.log(fetchedMyGarage);

      setGarages(fetchedGarages);
      setMyGarage(fetchedMyGarage);

      if (onCountChange) {
        onCountChange(fetchedGarages.length);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const goToGaragePage = (garage_id: string) => {
    navigation.navigate("GaragePage", {
      garage_id: garage_id,
    });
  };

  if (loading) {
    return <Text>Chargement...</Text>;
  }

  return (
    <View style={styles.main_style}>
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          data={garages}
          keyExtractor={(item) => item.garage_id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ padding: 5, paddingTop : 0, flexGrow: 1 }}
          ListHeaderComponent={
            show_my_garage ? (
              <View style={styles.myGarageCard}>
                <MyGarageCard garage_with_pictures={myGarage[0]} />
              </View>
            ) : null
          }
          renderItem={({ item }) => (
            <MiniGarageCard garage_with_pictures={item} />
          )}
        />
      </View>
    </View>
  );
};

export default GaragesPage;

const styles = StyleSheet.create({
  main_style: {
    flex: 1,
  },
  myGarageCard: {
    alignItems: "center",
  },
  garagePage: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  flat_list: {
    justifyContent: "center",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 10,
    paddingTop: 10,
  },
  container_garage: {
    paddingHorizontal: 10,
    paddingBottom: 16,
  },
  chargement: {
    alignSelf: "center",
  },
});
