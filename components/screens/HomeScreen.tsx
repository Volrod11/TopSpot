import { useCallback, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Dimensions,
    Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import MonthlyGarage from "../HomeComponent/components/MonthlyGarage";
import { Ionicons } from "@expo/vector-icons";
import CardSection from "../HomeComponent/components/CardSection";
import LastsSpots from "../HomeComponent/components/LastsSpots";
import Picture from "../HomeComponent/components/Picture";
import { supabase } from "../../lib/supabase";
import { HomeScreenStackParamList } from "../../types";
import SearchPage from "../pages/SearchPage";
import { useRef, useEffect } from "react";
import MultipleCardSection from "../HomeComponent/MultipleCardSection";
import { FlatList } from "react-native-gesture-handler";
import { useUser } from "../../context/UserContext";
import LoadingSpinner from "../HomeComponent/components/LoadingSpinner";
import Garage from "../HomeComponent/components/Garage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const { height } = Dimensions.get("window");
const PlaceholderImage = require("../../assets/topspottitle.png");

type HomeScreenNavigationProp = StackNavigationProp<
    HomeScreenStackParamList,
    "HomeScreen"
>;

type HomeScreenParams = {
  refresh?: () => void;
};

type HeaderProps = {
    openSearch: () => void;
};

type Filters = {
    sortBy?: string;
    brand?: string;
    period?: string;
    query?: string;
};

type HomepageContent = {
    id: string;
    type: "garage" | "picture" | "event";
    title: string;
    filters: Filters;
};

type Pictures = {
    picture_id: string;
    description: string | null;
    picture_url: string;
    user_id: string;
    username: string;
    avatar_url: string | null;
    likes_count: number;
    comments_count: number;
    relevance_score: number;
}

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
  total_pictures: number;
  total_views: number;
  created_at: string;
  rang: number;
  top_pictures_by_category: Picture[];
};


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
    console.log("data fetchHomePagePictures : ", data);

    return data as Pictures[];
}

const fetchHomePageGarages = async (limit: number, offset: number) => {
    const { data, error } = await supabase.rpc("get_garages_and_car_types_with_details", {
        p_query: null,
        p_profile: null,
        p_only_one: false,
        p_empty_garage: false,
        p_is_garage_finished: true,
        p_duration_type: "monthly",
        p_sort_by: null,
        p_limit: limit,
        p_offset: offset,
    });
    if (error) {
        console.error("Error fetching homepage garages:", error);
        return [];
    }

    return data as Garage_with_pictures[];
}

const Header = ({ openSearch }: HeaderProps) => {
    const slideAnim = useRef(new Animated.Value(height)).current;

    const navigation = useNavigation<HomeScreenNavigationProp>();

    const openMessaging = () => {
        navigation.navigate("MessagingPage");
    };

    const openNotifications = () => {
        navigation.navigate("NotificationsPage");
    };


    return (
        <LinearGradient
            colors={["#667DE9", "#764DA4"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradient}
        >
            <View style={styles.topRow}>
                <Text style={styles.title}>TopSpot</Text>
                <View style={styles.iconsContainer}>
                    <Pressable
                        onPress={openNotifications}
                        style={styles.iconButton}
                        hitSlop={8}
                    >
                        <Ionicons name="notifications-outline" size={20} color="#fff" />
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>3</Text>
                        </View>
                    </Pressable>
                    <Pressable
                        onPress={openMessaging}
                        style={[styles.iconButton, { marginLeft: 12 }]}
                        hitSlop={8}
                    >
                        <Ionicons name="chatbox-outline" size={20} color="#fff" />
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>3</Text>
                        </View>
                    </Pressable>

                    <Pressable
                        onPress={openSearch}
                        style={[styles.iconButton, { marginLeft: 12 }]}
                        hitSlop={8}
                    >
                        <Ionicons name="search-outline" size={20} color="#fff" />
                    </Pressable>
                </View>
            </View>
        </LinearGradient >
    )
}

export default function HomeScreen() {

    const slideAnim = useRef(new Animated.Value(height)).current;
    const navigation = useNavigation<NativeStackNavigationProp<HomeScreenStackParamList, 'HomeScreen'>>();

    const [refreshKey, setRefreshKey] = useState(0);
    const [searchVisible, setSearchVisible] = useState(false);
    const [homepageContents, setHomepageContents] = useState<HomepageContent[]>([]);
    const [pictures, setPictures] = useState<Pictures[]>([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const limit = 10;


    useEffect(() => {
        const fetchDataHomepage = async () => {
            const loadedHomepageContents = await fetchHomepageContents();
            setHomepageContents(loadedHomepageContents);
        };

        fetchDataHomepage();
    }, []);


    const loadPictures = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);

        const newPictures = await fetchHomePagePictures(limit, offset);

        setPictures((prev) => {
            const ids = new Set(prev.map(p => p.picture_id));
            const filtered = newPictures.filter(p => !ids.has(p.picture_id));
            return [...prev, ...filtered];
        });

        setOffset(prev => prev + limit);

        if (newPictures.length < limit) setHasMore(false);

        setLoading(false);
    }, [offset, loading, hasMore]);

    useEffect(() => {
        setPictures([]);
        loadPictures();
    }, [refreshKey]);


    useEffect(() => {
    navigation.setParams({ refresh: () => setRefreshKey(prev => prev + 1) });
}, []);


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



    return (
        <View style={styles.homePage}>
            <FlatList
                style={{ flex: 1 }}
                data={pictures}
                keyExtractor={(item) => item.picture_id}
                onEndReached={loadPictures}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading ? <LoadingSpinner /> : null}
                renderItem={({ item }) => (
                    <CardSection>
                        <Picture
                            picture_url={item.picture_url}
                            user_id={null}
                        />
                    </CardSection>
                )}
                ListHeaderComponent={
                    <>
                        <Header openSearch={openSearch} />
                        <CardSection
                            title="Garage du Mois"
                        >
                            <Garage show_my_garage={false} />
                        </CardSection>

                        <MultipleCardSection
                            title="Spots récents"
                        >
                            <LastsSpots />
                        </MultipleCardSection>
                        <CardSection
                            title={"test"}
                        >
                            <Picture
                                picture_url={"https://aosttdzezofbyaimkdnd.supabase.co/storage/v1/object/public/pictures/bj71.jpg"}
                                user_id={null}
                            />
                        </CardSection>
                    </>
                }
            />



            {/* Overlay SearchScreen */}
            {searchVisible && (
                <Animated.View
                    style={[styles.overlay, { transform: [{ translateY: slideAnim }] }]}
                >
                    <SearchPage onClose={closeSearch} />
                </Animated.View>
            )}
        </View>
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
    gradient: {
        paddingTop: 60,
        paddingHorizontal: 16,
        paddingBottom: 10,
        width: "100%",
        marginBottom: 20,
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "white",
        letterSpacing: 1,
        textShadowColor: "rgba(0,0,0,0.3)",
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    iconsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "rgba(255,255,255,0.15)",
        justifyContent: "center",
        alignItems: "center",
        position: "relative", // pour que le badge soit placé dessus
    },
    iconWrapper: {
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.15)",
        padding: 6,
        borderRadius: 20,
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
