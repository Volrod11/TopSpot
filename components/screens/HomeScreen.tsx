import { use, useCallback, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Dimensions,
    Animated,
    ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import MonthlyGarage from "../HomeComponent/components/MonthlyGarage";
import { Ionicons } from "@expo/vector-icons";
import CardSection from "../HomeComponent/components/CardSection";
import LastsSpots from "../HomeComponent/components/NearbyCars";
import Picture from "../HomeComponent/components/Picture";
import { supabase } from "../../lib/supabase";
import { CityRegion, HomeScreenStackParamList, NearbyCar, Garage_with_pictures_and_description, Pictures_with_infos } from "../../types";
import SearchPage from "../pages/SearchPage";
import { useRef, useEffect } from "react";
import MultipleCardSection from "../HomeComponent/MultipleCardSection";
import { FlatList } from "react-native-gesture-handler";
import { useUser } from "../../context/UserContext";
import LoadingSpinner from "../HomeComponent/components/LoadingSpinner";
import Garage from "../HomeComponent/components/Garage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import DiscoveryGrid from "../HomeComponent/components/DiscoveryGrid";
import SuggestedProfiles from "../HomeComponent/components/SuggestedProfiles";
import NearbyEvent from "../HomeComponent/components/NearbyEvent";
import useUserLocation from "../../utils/useUserLocation";
import { getCityRegionFromCoords } from "../../utils/getCityRegionFromCoords";
import NearbyCars from "../HomeComponent/components/NearbyCars";
import NewGarageCard from "../HomeComponent/components/NewGarageCard";
import { fetchHomePageGarages } from "../../utils/fetchHomePageGarages";
import GarageOfTheMonth from "../HomeComponent/components/GarageOfTheMonth";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");
const PlaceholderImage = require("../../assets/topspottitle.png");
const HEADER_HEIGHT = 80;

type HomeScreenNavigationProp = StackNavigationProp<
    HomeScreenStackParamList,
    "HomeScreen"
>;

type HeaderProps = {
    openSearch: () => void;
};

type Filters = {
    sortBy?: string;
    brand?: string;
    category?: string,
    period?: string;
    query?: string;
};

type HomepageContent = {
    id: string;
    type: "garage" | "picture" | "event";
    title: string;
    filters: Filters;
};

type TopPictures = {
    section_id: string,
    title: string,
    type: string,
    filters: Filters,
    picture_id: string,
    picture_url: string,
    car_id: string,
    likes: number
};

type Profiles = {
    profiles_id: string,
    username: string,
    avatar_url: string
};

type FeedItem =
    | { type: "picture"; data: Pictures_with_infos }
    | { type: "garage"; data: Garage_with_pictures_and_description }
    | { type: "discover"; component: "grid" | "profiles" | "nearby" };

const DISCOVER_TYPES: Array<"grid" | "profiles" | "nearby"> = [
  "grid",
  "profiles",
  "nearby",
];


const fetchHomepageContents = async () => {
    const { data, error } = await supabase.rpc("get_random_sections", {
        per_type: 3,
    });
    if (error) {
        console.error("Error fetching homepage contents:", error);
        return [];
    }

    return data as HomepageContent[];
};

const fetchHomePagePictures = async (limit: number, offset: number) => {

    const { data, error } = await supabase.rpc("get_home_feed_pictures", { p_limit: limit, p_offset: offset });
    if (error) {
        console.error("Error fetching homepage pictures:", error);
        return [];
    }

    return data as Pictures_with_infos[];
}


const fetchTopPictures = async () => {
    const { data, error } = await supabase.rpc('get_random_top_homepage');

    if (error) {
        console.error("Error fetching top pictures", error);
    }

    console.log(data);

    return data as TopPictures[];
}


const fetchSuggestedProfiles = async () => {
    const { data, error } = await supabase.rpc("get_suggested_profiles", { p_limit: 5 });

    if (error) {
        console.error("Error fetching suggested profiles", error);
    }

    return data as Profiles[];
}


const fetchNearbyCars = async (city: string, region: string) => {
    const { data, error } = await supabase.rpc("get_top2_pictures_city_or_region", {
        p_city: city, p_region: region
    })

    if (error) {
        console.error("Error fetching top 2 nearby cars");
    }

    return data as NearbyCar[];
}


const Header = ({ openSearch }: HeaderProps) => {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const openMessaging = () => navigation.navigate("MessagingPage");
    const openNotifications = () => navigation.navigate("NotificationsPage");

    return (
        <View style={styles.headerContainer}>
            <View style={styles.topRow}>
                <Text style={styles.titleDark}>TopSpot</Text>

                <View style={styles.iconsContainer}>
                    <Pressable onPress={openNotifications} style={styles.iconButton} hitSlop={8}>
                        <Ionicons name="notifications-outline" size={20} color="#1a1a1a" />
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>3</Text>
                        </View>
                    </Pressable>

                    <Pressable
                        onPress={openMessaging}
                        style={[styles.iconButton, { marginLeft: 12 }]}
                        hitSlop={8}
                    >
                        <Ionicons name="chatbox-outline" size={20} color="#1a1a1a" />
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>3</Text>
                        </View>
                    </Pressable>

                    <Pressable
                        onPress={openSearch}
                        style={[styles.iconButton, { marginLeft: 12 }]}
                        hitSlop={8}
                    >
                        <Ionicons name="search-outline" size={20} color="#1a1a1a" />
                    </Pressable>
                </View>
            </View>
        </View>
    );
};




export default function HomeScreen() {

    const slideAnim = useRef(new Animated.Value(height)).current;
    const navigation = useNavigation<NativeStackNavigationProp<HomeScreenStackParamList, 'HomeScreen'>>();
    const { location, errorMsg, loading } = useUserLocation(true);
    const insets = useSafeAreaInsets();
    const usedDiscoverTypes = useRef<Set<string>>(new Set());


    const [cityRegion, setCityRegion] = useState<CityRegion>(null);
    const [searchVisible, setSearchVisible] = useState(false);
    const [homepageContents, setHomepageContents] = useState<HomepageContent[]>([]);
    const [pictures, setPictures] = useState<Pictures_with_infos[]>([]);
    const [garages, setGarages] = useState<Garage_with_pictures_and_description[]>([]);
    const [offset, setOffset] = useState(0);
    const [loadingPicturesAndGarages, setLoadingPicturesAndGarages] = useState(false);
    const [hasMorePicture, setHasMorePicture] = useState(true);
    const [hasMoreGarage, setHasMoreGarage] = useState(true);
    const [items, setItems] = useState<FeedItem[]>([]);
    const [topsPictures, setTopsPictures] = useState<TopPictures[]>([]);
    const [suggestedProfiles, setSuggestedProfiles] = useState<Profiles[]>([]);
    const [nearbyCars, setNearbyCars] = useState<NearbyCar[]>([]);
    const [lastOffset, setLastOffset] = useState(0);

    const limit = 10;
    const addedPictureIds = useRef<Set<string>>(new Set());
    const addedGarageIds = useRef<Set<string>>(new Set());




    useEffect(() => {
        const fetchDataHomepage = async () => {
            const loadedHomepageContents = await fetchHomepageContents();
            setHomepageContents(loadedHomepageContents);
        };

        fetchDataHomepage();
    }, []);


    const loadPicturesAndGarages = useCallback(async () => {
        if (loadingPicturesAndGarages || (!hasMorePicture && !hasMoreGarage)) return;
        setLoadingPicturesAndGarages(true);

        let newPictures: Pictures_with_infos[] = [];
        let newGarages: Garage_with_pictures_and_description[] = [];
        let filteredPictures: Pictures_with_infos[] = [];
        let filteredGarages: Garage_with_pictures_and_description[] = [];

        if (hasMorePicture) {
            newPictures = await fetchHomePagePictures(limit, offset);
            filteredPictures = newPictures.filter(
                p => !addedPictureIds.current.has(p.picture_id)
            );
            filteredPictures.forEach(p => addedPictureIds.current.add(p.picture_id));
        }

        if (hasMoreGarage) {
            newGarages = await fetchHomePageGarages(
                null,
                null,
                false,
                true,
                "monthly",
                false,
                limit,
                offset,
                null
            );
            filteredGarages = newGarages.filter(
                g => !addedGarageIds.current.has(g.garage_id)
            );
            filteredGarages.forEach(g => addedGarageIds.current.add(g.garage_id));
        }

        const merged: FeedItem[] = [
    ...filteredPictures.map(p => ({ type: "picture" as const, data: p })),
    ...filteredGarages.map(g => ({ type: "garage" as const, data: g })),
  ];

  merged.sort(() => Math.random() - 0.5);

  const withDiscover: FeedItem[] = [];
  let counter = items.length;

  merged.forEach((item) => {
    withDiscover.push(item);
    counter++;

    if (counter % 5 === 0) {
      // ✅ Filtrer les types déjà utilisés
      const remaining = DISCOVER_TYPES.filter(
        t => !usedDiscoverTypes.current.has(t)
      );

      if (remaining.length > 0) {
        // Choisir aléatoirement parmi les restants
        const rand =
          remaining[Math.floor(Math.random() * remaining.length)];

        withDiscover.push({ type: "discover", component: rand });
        usedDiscoverTypes.current.add(rand); // ✅ Mémoriser
        counter++;
      }
    }
  });

  setItems(prev => [...prev, ...withDiscover]);
  setOffset(prev => prev + limit);

  if (newPictures.length < limit && newGarages.length < limit) {
    setHasMorePicture(false);
    setHasMoreGarage(false);
  }

  setLoadingPicturesAndGarages(false);
}, [offset, loadingPicturesAndGarages, hasMorePicture, hasMoreGarage, items.length]);



    useEffect(() => {
        const fetchTopPictureFromDatabase = async () => {
            const loadedTopPictures = await fetchTopPictures();
            setTopsPictures(loadedTopPictures);
        };

        fetchTopPictureFromDatabase();
    }, []);

    useEffect(() => {
        const fetchSuggestedProfilesFromDatabase = async () => {
            const loadedSuggestedProfiles = await fetchSuggestedProfiles();
            setSuggestedProfiles(loadedSuggestedProfiles);
        };

        fetchSuggestedProfilesFromDatabase();
    }, []);



    useEffect(() => {
        setPictures([]);
        setGarages([]);
        loadPicturesAndGarages();
    }, []);

    useEffect(() => {
        async function fetchCityRegion() {
            const info = await getCityRegionFromCoords(location.longitude, location.latitude);
            setCityRegion(info);
        }

        fetchCityRegion();
    }, [location]);

    useEffect(() => {
        async function fetchNearbyCarsFromDatabase() {
            const loadedNearbyCars = await fetchNearbyCars(cityRegion.city, cityRegion.region);
            setNearbyCars(loadedNearbyCars);
        };

        fetchNearbyCarsFromDatabase();
    }, [cityRegion]);





    const openSearch = () => {
        setSearchVisible(true);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const closeSearch = () => {
        Animated.timing(slideAnim, {
            toValue: height,
            duration: 300,
            useNativeDriver: true,

        }).start(() => {
            setSearchVisible(false);
        });
    };


    if (loading) return <ActivityIndicator size="large" color="blue" />;

    if (errorMsg) return <Text>Erreur : {errorMsg}</Text>;



    return (
        <View style={styles.homePage}>
            <Animated.FlatList
                style={{ flex: 1 }}
                data={items}
                keyExtractor={(item, index) => {
                    switch (item.type) {
                        case "picture":
                            return `pic-${item.data.picture_id}`;
                        case "garage":
                            return `garage-${item.data.garage_id}`;
                        case "discover":
                            return `discover-${item.component}-${index}`;
                    }
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: insets.top }}
                onEndReached={loadPicturesAndGarages}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loadingPicturesAndGarages ? <LoadingSpinner /> : null}
                renderItem={({ item }) => {
                    if (item.type === "picture") {
                        return (
                            <CardSection>
                                <Picture pictureWithInfos={item.data} />
                            </CardSection>
                        );
                    } else if (item.type === "garage") {
                        return (
                            <CardSection title="Garage">
                                <Garage garage={item.data} />
                            </CardSection>
                        );
                    } else if (item.type === "discover") {
                        switch (item.component) {
                            case "grid":
                                return <DiscoveryGrid topsPictures={topsPictures} />;
                            case "profiles":
                                return suggestedProfiles.length >= 5 ? (
                                    <SuggestedProfiles />
                                ) : null;
                            case "nearby":
                                return nearbyCars.length === 2 ? (
                                    <MultipleCardSection title={"Spots proches de toi"}>
                                        <NearbyCars
                                            nearbyCar1={nearbyCars[0]}
                                            nearbyCar2={nearbyCars[1]}
                                            cityRegion={cityRegion}
                                        />
                                    </MultipleCardSection>
                                ) : null;
                        }
                    }
                }}
                ListHeaderComponent={
                    <>
                        <Header openSearch={openSearch} />
                        <GarageOfTheMonth />
                    </>
                }
            />


            {/* Overlay SearchScreen */}
            {
                searchVisible && (
                    <Animated.View
                        style={[styles.overlay, { transform: [{ translateY: slideAnim }] }]}
                    >
                        <SearchPage onClose={closeSearch} />
                    </Animated.View>
                )
            }
        </View >
    );
}

const styles = StyleSheet.create({
    homePage: {
        flex: 1,
        backgroundColor: "#fff",
    },
    text: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        width: "100%",
    },
    scrollView: {
        alignItems: "center",
        justifyContent: "center",
    },
    titleDark: {
        fontSize: 26,
        fontWeight: "800",
        color: "#1a1a1a", // texte noir foncé
        letterSpacing: 0.5,
    },
    headerContainer: {
        backgroundColor: "white",
        paddingHorizontal: 16,
        paddingBottom: 10,
        height: 80,
        justifyContent: "flex-end",
    },

    headerWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: "800",
        color: "#1a1a1a", // Noir profond
        letterSpacing: 0.5,
    },
    iconsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "rgba(0,0,0,0.08)", // cercle noir semi-transparent
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    badge: {
        position: "absolute",
        top: -2,
        right: -2,
        backgroundColor: "#ef4444",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#fff",
        minWidth: 16,
        height: 16,
        paddingHorizontal: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    badgeText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "700",
    },
    iconWrapper: {
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.15)",
        padding: 6,
        borderRadius: 20,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff41",
        borderRadius: 6,
        paddingHorizontal: 10,
        height: 40,
        borderColor: "#ffffff60",
        borderWidth: 0.7,
    },
    searchIcon: {
        marginRight: 6,
    },
    searchInput: {
        flex: 1,
        color: "#000",
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
    },
});