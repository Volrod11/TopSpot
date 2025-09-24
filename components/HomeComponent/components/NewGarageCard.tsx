import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const month = "Février";
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



export default function ContestCard() {

    const onStart = () => {
        console.log("Défi lancé !")
    }
    return (
        <LinearGradient
            colors={["#FFD24C", "#F79C22"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
        >
            <Ionicons name="trophy" size={34} color="#222" style={{ marginBottom: 8 }} />
            <Text style={styles.title}>Nouveau mois : {month}</Text>
            <Text style={styles.subtitle}>
                De nouvelles catégories sont à découvrir !
            </Text>

            {/* Catégories en grille 2x2 */}
            <View style={styles.categoriesContainer}>
                {categories.map((item) => (
                    <View key={item.id} style={styles.categoryItem}>
                        {item.icon}
                        <Text style={styles.categoryText}>{item.label}</Text>
                    </View>
                ))}
            </View>

            {/* Bouton */}
            <TouchableOpacity style={styles.button} onPress={onStart}>
                <Text style={styles.buttonText}>Commencer le défi</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 18,
        paddingVertical: 22,
        paddingHorizontal: 18,
        alignItems: "center",
        margin: 12,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#222",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: "#333",
        marginBottom: 18,
        textAlign: "center",
    },
    categoriesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        backgroundColor: "rgba(255,255,255,0.25)",
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 22,
        width: "100%",
    },
    categoryItem: {
        width: "48%", // 2 colonnes
        aspectRatio: 1, // carré
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    categoryText: {
        marginTop: 6,
        fontSize: 14,
        fontWeight: "600",
        color: "#222",
        textAlign: "center",
    },
    button: {
        backgroundColor: "#111",
        paddingHorizontal: 28,
        paddingVertical: 12,
        borderRadius: 25,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});