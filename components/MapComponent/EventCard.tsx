import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Users } from "lucide-react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

type Categorie = {
  id: string,
  color: string,
  car_type: string
};

type Tag = {
  id: string,
  name: string,
  type: string,
  color: string
};

type EventCardProps = {
  start_time: string,
  end_time: string,
  title: string,
  location: string,
  participants: number,
  image_url: string | null,
  tags: Tag[],
  cats: Categorie[]
}

// Fonction pour rendre la couleur plus claire
const lightenColor = (color: string, percent: number) => {
  const num = parseInt(color.replace("#", ""), 16);
  const r = Math.min(255, ((num >> 16) + (255 - (num >> 16)) * percent));
  const g = Math.min(255, (((num >> 8) & 0x00FF) + (255 - ((num >> 8) & 0x00FF)) * percent));
  const b = Math.min(255, ((num & 0x0000FF) + (255 - (num & 0x0000FF)) * percent));
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}


export default function EventCard({ start_time, end_time, title, location, participants, image_url, tags, cats }: EventCardProps) {

  const displayImage = image_url || "https://cdn-s-www.dna.fr/images/D1DF21CB-6E64-4B71-92A7-03AFE908CAC2/NW_raw/les-quot-rassos-quot-sont-toujours-des-lieux-de-discussions-captivantes-entre-le-public-et-les-proprietaires-de-bolides-personnalises-photo-archives-jean-pierre-meyer-1732204148.jpg"; // image par défaut
  const startDate = new Date(start_time);
  const endDate = new Date(end_time);

  const isSameDay = startDate.toDateString() === endDate.toDateString();

  // Format jour + horaires
  const dayFormat = { weekday: "short", day: "numeric", month: "short" } as const;
  const startDay = startDate.toLocaleDateString("fr-FR", dayFormat);
  const endDay = endDate.toLocaleDateString("fr-FR", dayFormat);

  const startTime = startDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  const endTime = endDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  return (
    <View style={styles.card}>
      {/* Image à gauche */}
      <Image source={{ uri: displayImage }} style={styles.image} />

      {/* Contenu */}
      <View style={styles.content}>
        {/* Titre */}
        <Text style={styles.title}>{title}</Text>

        {/* Date */}
        <View style={styles.dateContainer}>
          {isSameDay ? (
            <>
              <Text style={styles.dateDay}>{startDay}</Text>
              <Text style={styles.dateTime}>{startTime} - {endTime}</Text>
            </>
          ) : (
            <Text style={styles.dateDay}>{startDay} → {endDay}</Text>
          )}
        </View>

        {/* Lieu et participants */}
        <View style={styles.row}>
          <FontAwesome5 name="map-marker-alt" size={14} color="#666" />
          <Text style={styles.text}>{location}</Text>
        </View>
        <View style={styles.row}>
          <FontAwesome6 name="users" size={14} color="#FF5722" />
          <Text style={styles.text}>{participants} participants</Text>
        </View>

        {/* Tags et catégories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollTags}>
          {cats.map((cat) => (
            <View key={cat.id} style={[styles.tag, { backgroundColor: lightenColor(cat.color, 0.7) }]}>
              <Text style={{ color: cat.color, fontSize: 12, fontWeight: '500' }}>{cat.car_type}</Text>
            </View>
          ))}
          {tags.map((tag) => (
            <View key={tag.id} style={[styles.tag, { backgroundColor: lightenColor(tag.color, 0.7) }]}>
              <Text style={{ color: tag.color, fontSize: 12, fontWeight: '500' }}>{tag.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 100,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  dateContainer: {
    marginBottom: 4,
  },
  dateDay: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  dateTime: {
    fontSize: 11,
    color: "#666",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  text: {
    marginLeft: 4,
    fontSize: 12,
    color: "#4B5563",
  },
  scrollTags: {
    marginTop: 4,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 6,
  },
});