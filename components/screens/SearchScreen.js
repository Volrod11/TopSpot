import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SearchScreen({ navigation }) {
    return (
        <View style={styles.settingsPage}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={styles.text}>Search Screen</Text>
        </View>
    );
}



const styles = StyleSheet.create({
    settingsPage: {
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