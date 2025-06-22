import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable, Modal } from 'react-native';
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
const fetchBrands = async () => {
    const { data, error } = await supabase
    .from('voitures')
    .select('marque', { count: 'exact', head: false })
    .order('marque', { ascending: true })
    .neq('marque', null);

    if (error) {
    console.error("Erreur Supabase:", error);
    return [];
    }

    const unique = [...new Set(data.map(row => row.marque))];
    
    return unique;
}

const fetchModels = async (marque : string) => {
    const { data, error } = await supabase
    .from('voitures')
    .select('modele', { count: 'exact', head: false })
    .eq('marque', marque)
    .order('modele', { ascending: true })
    .neq('modele', null);

    if (error) {
        console.error("Erreur Supabase:", error);
        return [];
    }

    const unique = [...new Set(data.map(row => row.modele))];
    
    return unique;
}

const PhotoDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
    const [modalBrandsVisible, setModalBrandsVisible] = React.useState<boolean>(false);
    const [modalModelsVisible, setModalModelsVisible] = React.useState<boolean>(false);
    const [selectedBrand, setSelectedBrand] = React.useState<string>('');
    const [selectedModel, setSelectedModel] = React.useState<string>('');
    const [brand, setBrands] = React.useState<string[]>([]);
    const [models, setModels] = React.useState<string[]>([]);
    console.log("Current photo : ", route.params.picture);
    

    useEffect(() => {
        const loadBrands = async () => {
            const result = await fetchBrands();
            setBrands(result);
        };
        loadBrands();
    },[]);

    useEffect(() => {
        const loadModeles = async (marque : string) => {
            const result = await fetchModels(marque);
            setModels(result);
        };
        loadModeles(selectedBrand);
    },[]);

    return (
        <View style={styles.container}>
            <Image source={{ uri: route.params.picture }} style={{height:300, width:300, borderRadius:5}} />
            <Pressable onPress={() => setModalBrandsVisible(true)} style={}>
                <Text>
                    {selectedBrand || "Sélectionnez une marque"}
                </Text>
            </Pressable>


            <Picker
                selectedValue={selectedBrand}
                onValueChange={setSelectedBrand}
                style={styles.picker}
            >
                <Picker.Item label="Sélectionnez une marque" value="" />
                {brand.map((model, i) => (
                <Picker.Item label={model} value={model} key={i} />
                ))}
            </Picker>
            <Picker
                selectedValue={selectedModel}
                onValueChange={setSelectedModel}
                style={styles.picker}
            >
                <Picker.Item label="Sélectionnez un modèle" value="" />
                {brand.map((model, i) => (
                <Picker.Item label={model} value={model} key={i} />
                ))}
            </Picker>


            <Modal visible={modalBrandsVisible || modalModelsVisible} animationType="slide">

            </Modal>
        </View>
    )
};

export default PhotoDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', marginVertical: 10, padding: 8 },
  picker: { height: 50, width: '100%' },
});