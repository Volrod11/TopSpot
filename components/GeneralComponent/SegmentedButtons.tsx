import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const options = ["Mensuel", "Annuel", "Mes Garages"];

export default function SegmentedButtons() {
  const [selected, setSelected] = useState("Mensuel");

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.button,
            selected === option && styles.activeButton
          ]}
          onPress={() => setSelected(option)}
        >
          <Text
            style={[
              styles.text,
              selected === option && styles.activeText
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#ffffffff", // gris clair pour thème clair
  },
  activeButton: {
    backgroundColor: "#FF6B35", // orange comme ton exemple
  },
  text: {
    color: "#333",
    fontWeight: "600",
  },
  activeText: {
    color: "white",
  },
});
