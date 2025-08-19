import React from 'react'
import { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { supabase } from '../../lib/supabase';

import MapView from 'react-native-maps';
import EventCard from '../MapComponent/EventCard';
import { Ionicons } from '@expo/vector-icons';
import EventsHeader from '../GeneralComponent/Header';

type User = {
  id: string;
  email?: string;
  user_metadata?: {
    [key: string]: any;
  };
};

const events = [
  {
    id: "1",
    date: { day: "15", month: "MAR" },
    title: "Meeting JDM Marseille",
    location: "Port de Marseille",
    time: "16h00 - 20h00",
    participants: 67,
    gradient: ["#377BF2", "#2054DB"],
    tags:
      [
        { label: "JDM", color: "#F3E8FF", fontColor: "#7E22CE" },
        { label: "Gratuit", color: "#DBEAFE", fontColor: "#1D4ED8" }
      ]
  },
  {
    id: "2",
    date: { day: "10", month: "AVR" },
    title: "Expo Supercars Paris",
    location: "Porte de Versailles",
    time: "10h00 - 18h00",
    participants: 150,
    gradient: ["#A450F3", "#8227D2"],
    tags:
      [
        { label: "Supercar", color: "#FEE2E2", fontColor: "#B91C1C" },
        { label: "Payant", color: "#FEF9C3", fontColor: "#BC7007" }
      ]
  },
  {
    id: "3",
    date: { day: "05", month: "MAI" },
    title: "Rallye Côte d’Azur",
    location: "Monaco",
    time: "08h00 - 20h00",
    participants: 200,
    gradient: ["#F97316", "#EF4444"],
    tags:
      [
        { label: "Rally", color: "#FEF3C9", fontColor: "#BB5309" },
        { label: "Gratuit", color: "#DBEAFE", fontColor: "#1D4ED8" }
      ]
  },

];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <EventsHeader
        pageName="Événements"
        onSearchPress={() => console.log("Recherche")}
        onFilterPress={() => console.log("Filtre")}
      />
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard {...item} />}
        contentContainerStyle={{ padding: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    marginLeft: 16,
  },
});