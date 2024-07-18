import * as React from 'react';
import { Button, StyleSheet, Image, Alert, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../lib/supabase';


type User = {
  id: string;
  email?: string;
  user_metadata?: {
      [key: string]: any;
  };
};

export default function App() {
    const [image, setImage] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getSession();
            const sessionUser = data.session?.user ?? null;
            setUser(sessionUser);
        };

        fetchUser();
    }, []);

    const pickImage = async () => {
        // Demander les permissions
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert("Permission to access camera is required!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            await uploadImage(result.assets[0].uri);
        }
    };

    const uploadImage = async (uri: string) => {
        try {

            const response = await fetch(uri);
            const arrayBuffer = await response.arrayBuffer();

            if (!arrayBuffer) {
                throw new Error("Failed to convert URI to ArrayBuffer.");
            }

            const fileName = `public/${Date.now()}.jpg`;
            const { data, error } = await supabase.storage
                .from('pictures')
                .upload(fileName, arrayBuffer);

            if (error) {
                throw error;
            }

            const { data: publicUrlData } = supabase.storage
                .from('pictures')
                .getPublicUrl(data.path);
            await savePictureData(publicUrlData.publicUrl);
        } catch (error: any) {
            Alert.alert('Error uploading image: ' + error.message);
        }
    };

    const savePictureData = async (url: string) => {
        console.log(user?.id);
        console.log(url);
        const { data, error } = await supabase
            .from('pictures')
            .insert([{ user_id: user?.id, picture: url}]);
        console.log("Insert data:", data);
        if (error) {
            Alert.alert('Error saving picture data: ' + error.message);
        } else {
            Alert.alert('Image uploaded successfully!');
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Take a Photo" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
    },
});


  
const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
