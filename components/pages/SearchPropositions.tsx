import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SearchPropositions() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      {/* Recherches récentes */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recherches récentes</Text>
          <Text style={styles.clear}>Effacer</Text>
        </View>
        {[
          "Lamborghini Aventador",
          "Garage supercar mars",
          "Meeting Cars Paris",
        ].map((item, idx) => (
          <Text key={idx} style={styles.listItem}>
            <Ionicons name="search-outline" size={15} color="black" /> {item}
          </Text>
        ))}
      </View>

      {/* Tendances */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tendances</Text>
        {["#SupercarSpotting", "#FerrariF8", "#ClassicCars"].map((tag, idx) => (
          <Text key={idx} style={styles.listItem}>
            {tag}
          </Text>
        ))}
      </View>

      {/* Catégories populaires */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Catégories populaires</Text>
        <View style={styles.categories}>
          <Pressable style={[styles.category, { backgroundColor: "#f43f5e" }]}>
            <Text style={styles.catText}>Supercars</Text>
          </Pressable>
          <Pressable style={[styles.category, { backgroundColor: "#3b82f6" }]}>
            <Text style={styles.catText}>Muscle Cars</Text>
          </Pressable>
          <Pressable style={[styles.category, { backgroundColor: "#22c55e" }]}>
            <Text style={styles.catText}>Off-Road</Text>
          </Pressable>
          <Pressable style={[styles.category, { backgroundColor: "#a855f7" }]}>
            <Text style={styles.catText}>Classiques</Text>
          </Pressable>
        </View>
      </View>

      {/* Utilisateurs suggérés */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Utilisateurs suggérés</Text>
        {["Alex_Spotter", "CarLover_Emma"].map((user, idx) => (
          <View key={idx} style={styles.userRow}>
            <Text>{user}</Text>
            <Pressable style={styles.followBtn}>
              <Text style={styles.followText}>Suivre</Text>
            </Pressable>
          </View>
        ))}
      </View>

      {/* Actions rapides */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions rapides</Text>
        <View style={styles.quickActions}>
          <Pressable style={styles.quickBtn}>
            <Text>Spotter maintenant</Text>
          </Pressable>
          <Pressable style={styles.quickBtn}>
            <Text>Événements près de moi</Text>
          </Pressable>
        </View>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16
  },
  scrollContainer: {
    flex: 1
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
  searchInput: {
    flex: 1,
    color: "#000",
  },
  searchIcon: {
    marginRight: 6,
  },
  tabs: { flexDirection: "row", marginBottom: 16 },
  tab: {
    marginRight: 12,
    padding: 6,
    backgroundColor: "#eee",
    borderRadius: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between" },
  sectionTitle: { fontWeight: "bold", marginBottom: 8 },
  clear: { color: "red" },
  listItem: { marginBottom: 6, color: "#333" },
  categories: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  category: { padding: 16, borderRadius: 12, width: "45%", marginBottom: 10 },
  catText: { color: "#fff", fontWeight: "bold" },
  userRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  followBtn: {
    backgroundColor: "#f43f5e",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  followText: { color: "#fff" },
  quickActions: { flexDirection: "row", justifyContent: "space-between" },
  quickBtn: {
    flex: 1,
    margin: 4,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    alignItems: "center",
  },
});
