import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useWindowDimensions } from "react-native";
import ProfileHeader from "../ProfileComponent/ProfileHeader";


// === SCENES ===
export default function UserPage({ route }) {
  const layout = useWindowDimensions();

  // L’id de l’utilisateur peut être passé depuis ton StackNavigator
  const { user_id } = route.params || {};

  const [index, setIndex] = React.useState(0);

  return (
    <View style={styles.container}>
      {/* Header profil */}
      <ProfileHeader />

      {/* Tabs */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{ backgroundColor: "#fff" }}
            labelStyle={{ color: "#000", fontWeight: "600" }}
            indicatorStyle={{ backgroundColor: "#f97316" }} // orange
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scene: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
