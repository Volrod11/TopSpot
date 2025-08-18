import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Users } from "lucide-react-native";

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function EventCard({ date, title, location, time, participants, tags }) {
  console.log("tags", tags);
  
  return (
    <View style={styles.card}>
      {/* Date */}
      <LinearGradient
        colors={["#F97316", "#EF4444"]} // orange → rouge
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.dateBox}
      >
        <Text style={styles.dateDay}>{date.day}</Text>
        <Text style={styles.dateMonth}>{date.month}</Text>
      </LinearGradient>

      {/* Contenu principal */}
      <View style={styles.content}>
        {/* Titre + Lieu */}
        <Text style={styles.title}>{title}</Text>
        <View style={styles.row}>
          <FontAwesome5 name="map-marker-alt" size={16} color="#666" />
          <Text style={styles.text}>{location}</Text>
        </View>

        {/* Temps + Participants */}
        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <MaterialCommunityIcons name="clock" size={16} color="#666" />
            <Text style={styles.text}>{time}</Text>
          </View>
          <View style={styles.row}>
            <FontAwesome6 name="users" size={16} color="#FF5722" />
            <Text style={styles.participants}>{participants} participants</Text>
          </View>
        </View>

        {/* Tags */}
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: tag.color }]}>
              <Text style={[styles.tagText, { color: tag.fontColor }]}>{tag.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dateBox: {
    width: 55,
    height: 55,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  dateDay: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  dateMonth: {
    fontSize: 12,
    color: "white",
    textTransform: "uppercase",
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  text: {
    marginLeft: 6,
    fontSize: 13,
    color: "#4B5563",
  },
  participants: {
    marginLeft: 4,
    fontSize: 13,
    color: "#EF4444",
    fontWeight: "500",
  },
  tagsContainer: {
    flexDirection: "row",
    marginTop: 6,
    gap: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#374151",
  },
});
