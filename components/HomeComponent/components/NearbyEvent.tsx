import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Pressable } from 'react-native';
import { supabase } from '../../../lib/supabase';
import EventCard from '../../MapComponent/EventCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeScreenStackParamList } from '../../../types';

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

type Event = {
  event_id: string,
  occurence_id: string | null,
  name: string,
  description: string,
  image_url: string,
  street: string,
  city: string,
  postal_code: string,
  country: string,
  lagitude: number,
  longitude: number,
  start_time: string,
  end_time: string,
  nb_participants: number,
  categories: Categorie[],
  tags: Tag[]
};

const fetchEvents = async () => {
  const { data, error } = await supabase.rpc("get_events_with_details", {
    p_query: null,
    p_sort_by: null,
    p_tagcat: null,
    p_limit: 2
  });

  if (error) {
    console.error("Error fetching event", error);
  };

  return data as Event[];
}

const NearbyEvent = ({
  name = "Cars & Coffee Paris",
  schedule = "Dimanche 24 Juin • 9h00",
  distance = "2.3 km",
  rating = "4.6",
  onViewOnMap = () => console.log('Voir sur la carte pressed')
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeScreenStackParamList>>();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEventsFromDataBase = async () => {
      const loadedEvents = await fetchEvents();
      setEvents(loadedEvents);
    };

    fetchEventsFromDataBase();
  }, [])
  return (
    <View style={styles.container}>
      {/* Header avec icône et infos */}
      <Pressable style={styles.container} onPress={() =>
        navigation.navigate('PicturesPage', {
          fetchFunction: "nearby",
          brand: item.filters.brand ?? null,
          period: item.filters.period ?? null,
          query: item.filters.query ?? null,
          sort_by: item.filters.sortBy ?? null,
          category: item.filters.category ?? null,
        })
      }>
        <FlatList
          data={events}
          keyExtractor={(item) => item.event_id + "." + item.occurence_id}
          renderItem={({ item }) => <EventCard
            start_time={item.start_time}
            end_time={item.end_time}
            title={item.name}
            location={item.street + " - " + item.city}
            participants={item.nb_participants}
            image_url={item.image_url}
            tags={item.tags}
            cats={item.categories}
          />}
          contentContainerStyle={{ padding: 12 }}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 6,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#E91E63',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  infoContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  schedule: {
    fontSize: 14,
    color: '#666666',
  },
  metaContainer: {
    alignItems: 'flex-end',
  },
  distance: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#666666',
  },
  mapButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  mapButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NearbyEvent;