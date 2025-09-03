// SearchScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import PicturesPage from "./PicturesPage";
import GaragesPage from "./GaragesPage";
import SearchPropositions from "./SearchPropositions";

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.container}>
          {/* Champ recherche */}
          <View style={styles.backAndSearchContainer}>
            <Pressable
              onPress={onClose}
              style={styles.backButton}
              hitSlop={10} // élargit la zone cliquable
            >
              <Ionicons name="arrow-back" size={22} color="#333" />
            </Pressable>
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
                placeholderTextColor="#888"
                style={styles.searchInput}
                value={search}
                onChangeText={setSearch}
                onFocus={() => setShowHistory(true)}
                onBlur={() => setShowHistory(false)}
                returnKeyType="search"
                onSubmitEditing={() => setShowHistory(false)}
                blurOnSubmit={true}
              />
            </View>
          </View>
          {/* Onglets */}
          <View style={styles.tabs}>
            <Pressable
              style={[
                styles.tab,
                activeTab === "photos" && styles.activeTab, // applique style actif
              ]}
              onPress={() => setActiveTab("photos")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "photos" && styles.activeTabText,
                ]}
              >
                Photos
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.tab,
                activeTab === "garages" && styles.activeTab, // applique style actif
              ]}
              onPress={() => setActiveTab("garages")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "garages" && styles.activeTabText,
                ]}
              >
                Garages
              </Text>
            </Pressable>
          </View>

          {/* Contenu */}
          <View style={{ flex: 1 }}>
            {showHistory ? (
              <SearchPropositions />
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
                    is_finished={true}
                    query={search}
                  />
                )}
              </>
            )}
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    paddingHorizontal: 0,
  },
  backAndSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 30,
    paddingHorizontal: 12,
    height: 44,
    flex: 1, // prend toute la largeur dispo
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  backButton: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#000",
  },
  searchIcon: {
    marginRight: 6,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
    gap: 12, // espace entre boutons (si RN > 0.71, sinon utiliser marginRight)
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 9999, // ovale
    backgroundColor: "#eee",
  },
  activeTab: {
    backgroundColor: "#f43f5e", // couleur active
  },
  tabText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  activeTabText: {
    color: "#fff",
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
