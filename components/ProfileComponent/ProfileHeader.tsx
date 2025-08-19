import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, MoreVertical, UserPlus, MessageSquare } from "lucide-react-native";

import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const ProfileHeader = () => {
  return (
    <LinearGradient
      colors={["#7B2FF7", "#4C6EF5"]}
      style={styles.container}
    >
      {/* Top bar with back + menu */}
      <View style={styles.topRow}>
        <Feather name="arrow-left" size={22} color="#fff" />
        <MaterialIcons name="more-horiz" size={22} color="#fff" />
      </View>

      {/* Avatar + Username */}
      <Image
        source={{ uri: "https://i.pravatar.cc/150?img=12" }}
        style={styles.avatar}
      />
      <Text style={styles.username}>Alex Martin</Text>
      <Text style={styles.handle}>@alexmartin_cars</Text>
      <Text style={styles.since}>Membre depuis Mars 2023</Text>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>127</Text>
          <Text style={styles.statLabel}>Photos</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Garages</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>2.1k</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>890</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      {/* Action buttons */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity style={[styles.button, styles.subscribeButton]}>
          <MaterialIcons name="person-add-alt-1" size={16} color="#2563EB" />
          <Text style={[styles.buttonText, { color: "#2563EB" }]}>S’abonner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.messageButton]}>
          <Ionicons name="chatbox" size={16} color="#9CA3AF" />
          <Text style={[styles.buttonText, { color: "#9CA3AF" }]}>Message</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  topRow: {
    position: "absolute",
    top: 50,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#fff",
    marginTop: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 8,
  },
  handle: {
    fontSize: 14,
    color: "#E5E7EB",
  },
  since: {
    fontSize: 12,
    color: "#D1D5DB",
    marginTop: 2,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  statLabel: {
    fontSize: 12,
    color: "#E5E7EB",
  },
  buttonsRow: {
    flexDirection: "row",
    marginTop: 20,
    gap: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 6,
  },
  subscribeButton: {
    backgroundColor: "#fff",
  },
  messageButton: {
    backgroundColor: "#F3F4F6",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default ProfileHeader;
