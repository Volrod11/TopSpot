import { useState, useEffect } from 'react'
import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native';
import { Session } from '@supabase/supabase-js'
import { supabase } from '../../../lib/supabase';

type User = {
    id: string;
    email?: string;
    user_metadata?: {
        [key: string]: any;
    };
};


const Settings: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getSession();
            const sessionUser = data.session?.user ?? null;
            setUser(sessionUser);
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) alert(error.message);
    };

    return (
        <View style={styles.container}>
            {user ? (
                <>
                    <Text style={styles.title}>Welcome, {user.email}</Text>
                    <Button title="Logout" onPress={handleLogout} />
                </>
            ) : (
                <Text style={styles.title}>Loading...</Text>
            )}
        </View>
    );
}

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
});



const styles2 = StyleSheet.create({
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