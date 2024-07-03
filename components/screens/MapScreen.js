import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MapScreen({ navigation }) {
    return (
        <View style={styles.mapPage}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={styles.text}>Map Screen</Text>
        </View>
    );
}




const styles = StyleSheet.create({
    mapPage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#0D0D0D",
    },
    text: { 
        fontSize: 26,
        fontWeight: 'bold',
        color: "#fff",
    }, 
});