import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Text, View, StyleSheet, Image, Pressable, ImageBackground, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator(); // Stack contains Screen & Navigator properties

const PlaceholderImageR8 = require("../../../assets/images/r8.png");
const PlaceholderImageF150 = require("../../../assets/images/F150.png");
const PlaceholderImageLigier = require("../../../assets/images/ligier.png");
const PlaceholderImageSenna = require("../../../assets/images/senna.png");

export default function PicturesPage({}) {
  const navigation = useNavigation();
  const images = [
    PlaceholderImageR8,
    PlaceholderImageF150,
    PlaceholderImageLigier,
    PlaceholderImageSenna,
    PlaceholderImageSenna,
    PlaceholderImageSenna,
    PlaceholderImageSenna,
    PlaceholderImageSenna,
  ];

  return (
    <View style={styles.picturesPage}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <View style={styles.container}>
          {images.map((image) => (
            <Pressable onPress={() => navigation.navigate("TestPage", { idImage: image })} style={styles.bouton}>
              <Image ImageViewer source={image} contentFit="cover" style={styles.image} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  picturesPage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0D0D0D",
  },
  scrollView: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#0D0D0D",
  },
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    alignItems: "center", //Centered horizontally
  },
  bouton: {
    width: "32.93%",
    height: 200,
    margin: "0.2%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 0,
  },
});
