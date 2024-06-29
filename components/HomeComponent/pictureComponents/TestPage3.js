import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PagerView from 'react-native-pager-view';

const Stack = createNativeStackNavigator(); // Stack contains Screen & Navigator properties


const PlaceholderImageR8 = require('../../../assets/images/r8.png');
const PlaceholderImageF150 = require('../../../assets/images/F150.png');
const PlaceholderImageLigier = require('../../../assets/images/ligier.png');
const PlaceholderImageSenna = require('../../../assets/images/senna.png');
const PlaceholderImageXM = require('../../../assets/images/XM.png');
const PlaceholderImageCorvette = require('../../../assets/images/corvette.png');
const PlaceholderImage570s = require('../../../assets/images/570s.png');
const PlaceholderImageM3 = require('../../../assets/images/m3.png');

export default function TestPage3({ }) {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        <PagerView style={styles.container2} initialPage={0}>
          <View style={styles.page} key="1">
            <Text>First page</Text>
            <Text>Swipe ➡️</Text>
          </View>
          <View style={styles.page} key="2">
            <Text>Second page</Text>
          </View>
          <View style={styles.page} key="3">
            <Text>Third page</Text>
          </View>
        </PagerView>
        <PagerView style={styles.container2} initialPage={0}>
          <View style={styles.page} key="1">
            <Text>First page</Text>
            <Text>Swipe ➡️</Text>
          </View>
          <View style={styles.page} key="2">
            <Text>Second page</Text>
          </View>
          <View style={styles.page} key="3">
            <Text>Third page</Text>
          </View>
        </PagerView>
        <PagerView style={styles.container2} initialPage={0}>
          <View style={styles.page} key="1">
            <Text>First page</Text>
            <Text>Swipe ➡️</Text>
          </View>
          <View style={styles.page} key="2">
            <Text>Second page</Text>
          </View>
          <View style={styles.page} key="3">
            <Text>Third page</Text>
          </View>
        </PagerView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    height: 200,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    width: "100%",
    backgroundColor: '#dddddd',
  },
});