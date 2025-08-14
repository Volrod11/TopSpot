import React from "react";
import { View, Text, Image, StyleSheet, Dimensions  } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get("window").width;


export default function MyGarageCard() {
  return (
    <View style={[styles.card,{width: screenWidth - 24}]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
            style={styles.avatar}
          />
          <Text style={styles.title}>Mon Garage</Text>
        </View>
        <View style={styles.likes}>
          <Ionicons name="heart" size={16} color="red" />
          <Text style={styles.likesText}>247</Text>
        </View>
      </View>

      {/* Categories grid */}
      <View style={styles.grid}>
        {[
          {
            name: "Supercars",
            uri: "https://aosttdzezofbyaimkdnd.supabase.co/storage/v1/object/public/pictures//mustang.jpg",
          },
          {
            name: "Muscle Cars",
            uri: "https://aosttdzezofbyaimkdnd.supabase.co/storage/v1/object/public/pictures//mustang.jpg",
          },
          {
            name: "Off-Road",
            uri: "https://aosttdzezofbyaimkdnd.supabase.co/storage/v1/object/public/pictures//mustang.jpg",
          },
          null, // Empty category
        ].map((cat, index) =>
          cat ? (
            <View key={index} style={styles.category}>
              <Image source={{ uri: cat.uri }} style={styles.image} />
              <View style={styles.overlay}>
                <Text style={styles.overlayText}>{cat.name}</Text>
              </View>
            </View>
          ) : (
            <View key={index} style={styles.emptyCategory}>
              <Text style={styles.emptyText}>Électriques</Text>
            </View>
          )
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>3/4 catégories</Text>
        <Text style={[styles.footerText, styles.rank]}>#2 ce mois</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    width: 230,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  likes: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  likesText: {
    fontSize: 12,
    color: "#666",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 6,
    marginBottom: 8,
  },
  category: {
    width: "48%",
    height: 90,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  overlayText: {
    color: "#fff",
    fontSize: 10,
  },
  emptyCategory: {
    width: "48%",
    height: 90,
    borderRadius: 8,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#999",
    fontSize: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 10,
    color: "#666",
  },
  rank: {
    color: "#3b82f6",
  },
});
