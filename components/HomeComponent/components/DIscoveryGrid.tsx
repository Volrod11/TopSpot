import React from "react";
import { View, Text, ImageBackground, Pressable, StyleSheet, FlatList } from "react-native";

type Filters = {
    sortBy?: string;
    brand?: string;
    category?: string,
    period?: string;
    query?: string;
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

type DiscoveryGridProps = {
 topsPictures: TopPictures[]
};


export default function DiscoveryGrid({topsPictures}: DiscoveryGridProps) {
  const renderItem = ({ item }: { item: TopPictures }) => (
    <Pressable style={styles.card}>
      <ImageBackground
        source={{ uri: item.picture_url }}
        style={styles.image}
        imageStyle={{ borderRadius: 16 }}
      >
        <View style={styles.overlay} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Découverte</Text>
      <FlatList
        data={topsPictures}
        renderItem={renderItem}
        keyExtractor={(item) => item.section_id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    flex: 1,
    marginBottom: 12,
    marginHorizontal: 4,
    height: 150,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  textContainer: {
    padding: 10,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#ddd",
    fontSize: 12,
    marginTop: 2,
  },
  badge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#ffe100",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
});
