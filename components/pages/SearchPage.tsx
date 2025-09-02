// SearchScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import PicturesPage from "./PicturesPage";
import GaragesPage from "./GaragesPage";

const windowWidth = Dimensions.get("window").width;

type SearchScreenProps = {
  onClose: () => void;
};

export default function SearchPage({ onClose }: SearchScreenProps) {
  const navigation = useNavigation();
  const inputRef = useRef<TextInput>(null);

  const [activeTab, setActiveTab] = useState<"photos" | "garages">("photos");
  const [search, setSearch] = React.useState("");
  const [showHistory, setShowHistory] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        {/* Champ recherche */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#00000080"
            style={styles.searchIcon}
          />
          <TextInput
            ref={inputRef}
            placeholder="Rechercher..."
            placeholderTextColor="#00000080"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            onFocus={() => setShowHistory(true)}
            onBlur={() => setShowHistory(false)}
            returnKeyType="search" // ✅ affiche "Rechercher" sur le clavier
            onSubmitEditing={() => setShowHistory(false)} // ✅ déclenche la recherche
            blurOnSubmit={true}
          />
        </View>
        {/* Onglets */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 10,
          }}
        >
          <Pressable onPress={() => setActiveTab("photos")}>
            <Text
              style={{ fontWeight: activeTab === "photos" ? "bold" : "normal" }}
            >
              Photos
            </Text>
          </Pressable>
          <Pressable onPress={() => setActiveTab("garages")}>
            <Text
              style={{
                fontWeight: activeTab === "garages" ? "bold" : "normal",
              }}
            >
              Garages
            </Text>
          </Pressable>
        </View>

        {/* Contenu */}
        <View style={{ flex: 1 }}>
          {showHistory ? (
            <View>
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
                    🔍 {item}
                  </Text>
                ))}
              </View>

              {/* Tendances */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tendances</Text>
                {["#SupercarSpotting", "#FerrariF8", "#ClassicCars"].map(
                  (tag, idx) => (
                    <Text key={idx} style={styles.listItem}>
                      {tag}
                    </Text>
                  )
                )}
              </View>

              {/* Catégories populaires */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Catégories populaires</Text>
                <View style={styles.categories}>
                  <Pressable
                    style={[styles.category, { backgroundColor: "#f43f5e" }]}
                  >
                    <Text style={styles.catText}>Supercars</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.category, { backgroundColor: "#3b82f6" }]}
                  >
                    <Text style={styles.catText}>Muscle Cars</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.category, { backgroundColor: "#22c55e" }]}
                  >
                    <Text style={styles.catText}>Off-Road</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.category, { backgroundColor: "#a855f7" }]}
                  >
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
            </View>
          ) : (
            <>
              {activeTab === "photos" && (
                <PicturesPage
                  user_id={null}
                  brand_filter={null}
                  period={null}
                  sort_by={null}
                  query={search}
                />
              )}
              {activeTab === "garages" && (
                <GaragesPage
                  user_id={null}
                  show_my_garage={false}
                  garage_type={null}
                  is_finished={null}
                  query={search}
                />
              )}
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
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
  section: { marginBottom: 20 },
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
