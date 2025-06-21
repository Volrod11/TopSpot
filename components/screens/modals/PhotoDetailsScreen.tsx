import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from 'react-native';
import { CameraScreenStackParamList, RootStackParamList } from "../../../types";
import { Picker } from '@react-native-picker/picker';
import { RouteProp } from "@react-navigation/native";
import { supabase } from "../../../lib/supabase";
import { StackNavigationProp } from "@react-navigation/stack";

type PhotoDetailsScreenRouteProp = RouteProp<CameraScreenStackParamList, 'PhotoDetailsScreen'>;
type PhotoDetailsScreenNavigationProp = StackNavigationProp<CameraScreenStackParamList, 'PhotoDetailsScreen'>;

type Props = {
    navigation: PhotoDetailsScreenNavigationProp;
    route: PhotoDetailsScreenRouteProp; 
};

//Base de données
const fetchMarques = async () => {
    const { data, error } = await supabase
    .from('voitures')
    .select('marque', { count: 'exact', head: false })
    .order('marque', { ascending: true })
    .neq('marque', null);

    const unique = [...new Set(data.map(row => row.marque))];
    return unique;
}

const PhotoDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
    const [selectedModel, setSelectedModel] = React.useState<string>('');
    const [models, setModels] = React.useState<string[]>([]);


    useEffect(() => {
        const loadModels = async () => {
            const result = await fetchMarques();
            setModels(result);
        };
        loadModels();
    },[]);

    return (
        <View style={styles.container}>
            <Image source={{ uri: route.params.picture }} />
            <Picker
                selectedValue={selectedModel}
                onValueChange={setSelectedModel}
                style={styles.picker}
            >
                <Picker.Item label="Sélectionnez un modèle" value="" />
                {models.map((model, i) => (
                <Picker.Item label={model} value={model} key={i} />
                ))}
            </Picker>
        </View>
    )
};

export default PhotoDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', marginVertical: 10, padding: 8 },
  picker: { height: 50, width: '100%' },
});