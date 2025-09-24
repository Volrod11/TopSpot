import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const notificationsData = [
  {
    id: "1",
    title: "Nouveau message",
    description: "Alice t’a envoyé un message",
    time: "Il y a 5 min",
    icon: "chatbubble-ellipses-outline",
    unread: true,
  },
  {
    id: "2",
    title: "Mise à jour disponible",
    description: "Une nouvelle version de l’application est prête",
    time: "Il y a 2 h",
    icon: "cloud-download-outline",
    unread: false,
  },
  {
    id: "3",
    title: "Rappel",
    description: "N’oublie pas ton rendez-vous à 18h",
    time: "Hier",
    icon: "calendar-outline",
    unread: true,
  },
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(notificationsData);

  const insets = useSafeAreaInsets();

  const renderNotification = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.row}>
        {/* Icône à gauche */}
        <View style={[styles.iconContainer, item.unread && styles.iconUnread]}>
          <Ionicons name={item.icon as any} size={22} color={item.unread ? "#fff" : "#3b82f6"} />
        </View>

        {/* Texte principal */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description} numberOfLines={1}>
            {item.description}
          </Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>

        {/* Point bleu si non lu */}
        {item.unread && <View style={styles.unreadDot} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={{ paddingVertical: 12 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#e0e7ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  iconUnread: {
    backgroundColor: "#3b82f6",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  description: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 4,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3b82f6",
    marginLeft: 10,
  },
});
