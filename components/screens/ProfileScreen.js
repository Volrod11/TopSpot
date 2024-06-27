import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen({ navigation }) {
    return (
        <View style={styles.profilePage}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={styles.text}>Profile Screen</Text>
        </View>
    );
}




const styles = StyleSheet.create({
    profilePage: {
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