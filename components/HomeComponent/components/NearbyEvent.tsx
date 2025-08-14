import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NearbyEvent = ({ 
  name = "Cars & Coffee Paris",
  schedule = "Dimanche 24 Juin • 9h00",
  distance = "2.3 km",
  rating = "4.6",
  onViewOnMap = () => console.log('Voir sur la carte pressed')
}) => {
  return (
    <View style={styles.container}>
      {/* Header avec icône et infos */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <View style={styles.icon}>
            <Text style={styles.iconText}>🚗</Text>
          </View>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.schedule}>{schedule}</Text>
        </View>
        
        <View style={styles.metaContainer}>
          <Text style={styles.distance}>{distance}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {rating}</Text>
          </View>
        </View>
      </View>
      
      {/* Bouton "Voir sur la carte" */}
      <TouchableOpacity style={styles.mapButton} onPress={onViewOnMap}>
        <Text style={styles.mapButtonText}>Voir sur la carte</Text>
      </TouchableOpacity>
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