import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EventsHeader({ pageName, onSearchPress, onFilterPress }) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <Text style={styles.title}>{pageName}</Text>

            <View style={styles.icons}>
                <TouchableOpacity onPress={onSearchPress} style={styles.iconBtn}>
                    <Ionicons name="search" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onFilterPress} style={styles.iconBtn}>
                    <Ionicons name="funnel" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "white",
        height: 100, // Adjust height as needed
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#111827",
    },
    icons: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconBtn: {
        marginLeft: 16,
    },
});
