import React from 'react'
import { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native';
import { supabase } from '../../lib/supabase';

import MapView from 'react-native-maps';

type User = {
    id: string;
    email?: string;
    user_metadata?: {
        [key: string]: any;
    };
};

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <MapView style={styles.map} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      map: {
        width: '100%',
        height: '100%',
      },
});
