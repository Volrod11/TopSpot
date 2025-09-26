import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

type Top1GarageProps = {
  children: React.ReactNode;
};

export default function Top1Garage({ children }: Top1GarageProps) {
  const now = new Date();
  const mois = now.toLocaleString("fr-FR", { month: "long" }); // ex: "septembre"
  const annee = now.getFullYear();

  return (
    <View
      style={styles.background}
    >
      {/* Bandeau titre */}
      <View style={styles.header}>
        <Text style={styles.trophy}>🏆 Garage du mois</Text>
        <Text style={styles.subtitle}>
          Garage le plus liké de {mois} {annee}
        </Text>
      </View>

      {/* ✅ Ton Garage normal */}
      <View style={styles.garageContainer}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    marginTop: 12,
    paddingVertical: 16,
    backgroundColor: "#FEF6E7"
  },
  backgroundImage: {
    resizeMode: "cover",
    opacity: 0.3, // léger effet de transparence
  },
  header: {
    alignItems: "center",
    marginBottom: 12,
  },
  trophy: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFD700", // or style trophée
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
    marginTop: 4,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  garageContainer: {
    marginHorizontal: 8,
  },
});
