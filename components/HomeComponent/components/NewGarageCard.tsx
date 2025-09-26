import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeScreenStackParamList } from "../../../types";
import { supabase } from "../../../lib/supabase";

const description = "Nouveau défi mensuel disponible !";
const categories =
    [
        {
            id: "electric",
            label: "Electric",
            icon: <Ionicons name="car" size={26} color="#222" />,
        },
        {
            id: "vintage",
            label: "Vintage",
            icon: <MaterialCommunityIcons name="car-3-plus" size={26} color="#222" />,
        },
        {
            id: "truck",
            label: "Truck",
            icon: <MaterialCommunityIcons name="truck" size={26} color="#222" />,
        },
        {
            id: "moto",
            label: "Moto",
            icon: <MaterialCommunityIcons name="motorbike" size={26} color="#222" />,
        },
    ]


type Category = {
    id: string;
    label: string;
    icon: React.ReactNode;
};

type ContestCardProps = {
    month: string;                 // ex: "Février"
    categories: Category[];        // 4 catégories max pour 2x2
    onStart: () => void;
};

type Categorie = {
    id: string,
    car_type: string,
    color: string,
    icon:  string | null;
}


const fetchCategoriesGarage = async () => {
    const {data, error} = await supabase.rpc("get_categories_of_actual_monthly_garage");

    if (error) {
        console.error("Error fetching garage categories");
        return [];
    }

    return data as Categorie[];
}


export default function NewGarageCard() {
    const navigation = useNavigation<NativeStackNavigationProp<HomeScreenStackParamList>>();
    const now = new Date();
    const monthName = now.toLocaleString("fr-FR", { month: "long" });
    const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    const [categories,setCategories] = useState<Categorie[]>([]);


    const onStart = () => {
        console.log("ok");
    }

    useEffect(() => {
        const fetchCategoriesGarageFromDatabase = async () => {
            const loadedCategories = await fetchCategoriesGarage();
            setCategories(loadedCategories);
        };

        fetchCategoriesGarageFromDatabase();
    },[]);

    return (
        <LinearGradient
            colors={["#FFD24C", "#F79C22"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
        >
            <Text style={styles.title}>Nouveau mois : {capitalizedMonth}</Text>
            <Text style={styles.subtitle}>Nouvelles catégories à découvrir !</Text>

            <View style={styles.grid}>
                {categories.map((cat) => (
                    <View key={cat.id} style={styles.widget}>
                        {cat.icon || <Ionicons name="car" size={26} color="#222" />}
                        <Text style={styles.widgetLabel}>{cat.car_type}</Text>
                    </View>
                ))}
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 16,
        alignItems: "center",
        marginHorizontal: 12,
        marginVertical: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#222",
        marginTop: 6,
    },
    subtitle: {
        fontSize: 13,
        color: "#333",
        marginBottom: 14,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 12,
    },
    widget: {
        width: "48%",
        height: 90,
        backgroundColor: "rgba(255,255,255,0.35)",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },
    widgetLabel: {
        marginTop: 6,
        fontSize: 14,
        fontWeight: "600",
        color: "#222",
        textAlign: "center",
    },
    button: {
        backgroundColor: "#111",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 6,
    },
});