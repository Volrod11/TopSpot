import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PagerView from "react-native-pager-view";

const Stack = createNativeStackNavigator(); // Stack contains Screen & Navigator properties

const PlaceholderImageR8 = require("../../../assets/images/r8.png");
const PlaceholderImageF150 = require("../../../assets/images/F150.png");
const PlaceholderImageLigier = require("../../../assets/images/ligier.png");
const PlaceholderImageSenna = require("../../../assets/images/senna.png");
const PlaceholderImageXM = require("../../../assets/images/XM.png");
const PlaceholderImageCorvette = require("../../../assets/images/corvette.png");
const PlaceholderImage570s = require("../../../assets/images/570s.png");
const PlaceholderImageM3 = require("../../../assets/images/m3.png");

export default function GaragePage({}) {
  const garages = [
    {
      name: "Hypercars",
      cars: [
        {
          name: "McLaren",
          year: 2017,
          nm: 800,
          cv: 800,
          kg: 1198,
          image: PlaceholderImageSenna,
        },
      ],
    },
    {
      name: "American",
    },
    {
      name: "Supercars",
    },
    {
      name: "BMW",
    },
  ];
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <View style={styles.cat_infos}>
          <Text style={styles.title}>Hypercars</Text>
          <PagerView style={styles.container2} initialPage={0}>
            <View style={styles.categorie_left} key="1">
              <Image
                ImageViewer
                source={PlaceholderImageSenna}
                contentFit="cover"
                style={styles.image}
              />
              <View style={styles.infos_car}>
                <Text style={styles.info}>McLaren</Text>
                <Text style={styles.info}>2017</Text>
                <Text style={styles.info}>800 Nm</Text>
              </View>
              <View style={styles.infos_car}>
                <Text style={styles.info}>Senna</Text>
                <Text style={styles.info}>800 cv</Text>
                <Text style={styles.info}>1198 kg</Text>
              </View>
            </View>
          </PagerView>
        </View>
        <View style={styles.cat_infos}>
          <Text style={styles.title}>American</Text>
          <PagerView style={styles.container2} initialPage={0}>
            <View style={styles.categorie_right} key="2">
              <View style={styles.infos_car}>
                <Text style={styles.info}>McLaren</Text>
                <Text style={styles.info}>McLaren</Text>
                <Text style={styles.info}>McLaren</Text>
              </View>
              <View style={styles.infos_car}>
                <Text style={styles.info}>McLaren</Text>
                <Text style={styles.info}>McLaren</Text>
                <Text style={styles.info}>McLaren</Text>
              </View>
              <Image
                ImageViewer
                source={PlaceholderImageCorvette}
                contentFit="cover"
                style={styles.image}
              />
            </View>
          </PagerView>
        </View>
        <View style={styles.cat_infos}>
          <Text style={styles.title}>Supercars</Text>
          <PagerView style={styles.container2} initialPage={0}>
            <View style={styles.categorie_left}>
              <Image
                ImageViewer
                source={PlaceholderImage570s}
                contentFit="cover"
                style={styles.image}
              />
              <View style={styles.infos_car}>
                <Text style={styles.info}>McLaren</Text>
                <Text style={styles.info}>McLaren</Text>
                <Text style={styles.info}>McLaren</Text>
              </View>
              <View style={styles.infos_car}>
                <Text style={styles.info}>McLaren</Text>
                <Text style={styles.info}>McLaren</Text>
                <Text style={styles.info}>McLaren</Text>
              </View>
            </View>
          </PagerView>
        </View>
        <View style={styles.cat_infos}>
          <Text style={styles.title}>BMW</Text>
          <PagerView style={styles.container2} initialPage={0}>
            <View style={styles.categorie_right} key="1">
              <View style={styles.infos_car}>
                <Text style={styles.info}>McLaren</Text>
                <Text style={styles.info}>McLaren</Text>
                <Text style={styles.info}>McLaren</Text>
              </View>
              <View style={styles.infos_car}>
                <Text style={styles.info}>McLaren</Text>
                <Text style={styles.info}>McLaren</Text>
                <Text style={styles.info}>McLaren</Text>
              </View>
              <Image
                ImageViewer
                source={PlaceholderImageM3}
                contentFit="cover"
                style={styles.image}
              />
            </View>
            <View style={styles.categorie_right} key="2">
              <View style={styles.infos_car}>
                <Text style={styles.info}>McLaren</Text>
                <Text style={styles.info}>2017</Text>
                <Text style={styles.info}>800 Nm</Text>
              </View>
              <View style={styles.infos_car}>
                <Text style={styles.info}>Senna</Text>
                <Text style={styles.info}>800 cv</Text>
                <Text style={styles.info}>1198 kg</Text>
              </View>
              <Image
                ImageViewer
                source={PlaceholderImageXM}
                contentFit="cover"
                style={styles.image}
              />
            </View>
          </PagerView>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
  },
  scrollView: {
    width: "100%",
    backgroundColor: "#0D0D0D",
  },
  image: {
    flex: 1,
    height: "100%",
    borderRadius: 18,
  },
  cat_infos: {
    marginTop: 30,
  },
  categorie_left: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    height: 150,
    marginBottom: 30,
  },
  categorie_right: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    height: 150,
    marginBottom: 30,
  },
  infos_car: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: 10,
  },
  info: {
    color: "#fff",
    padding: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  title: {
    textAlign: "center", // <-- the magic
    color: "#fff",
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  container2: {
    height: 150,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
});
