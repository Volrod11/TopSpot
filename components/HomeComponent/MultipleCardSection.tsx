import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MultipleCardSection = ({ title, children }) => {
    return (
        <View style={styles.cardSection}>
            {title && <Text style={styles.title}>{title}</Text>}
            <View style={styles.card}>
                {children}
            </View>
        </View>
    );
};

export default MultipleCardSection;

const styles = StyleSheet.create({
    cardSection: {
        width: '100%',
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginTop: 4,
        marginBottom: 8,
        elevation: 4, // Android shadow
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333',
    },
});
