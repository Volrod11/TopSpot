import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Easing } from "react-native";

export default function LoadingSpinner() {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.spinner, { transform: [{ rotate: rotation }] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  spinner: {
    width: 40,
    height: 40,
    borderWidth: 4,
    borderColor: "#FFD24C", // couleur TopSpot
    borderTopColor: "#F79C22",
    borderRadius: 20,
  },
});
