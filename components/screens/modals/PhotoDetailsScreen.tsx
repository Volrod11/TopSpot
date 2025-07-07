import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable, Modal } from 'react-native';
import { CameraScreenStackParamList, RootStackParamList } from "../../../types";
import { Picker } from '@react-native-picker/picker';
import { RouteProp } from "@react-navigation/native";
import { supabase } from "../../../lib/supabase";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { Button } from "@rneui/base";

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

const fetchModels = async (marque: string) => {
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
    const [brands, setBrands] = React.useState<string[]>([]);
    const [models, setModels] = React.useState<string[]>([]);
    const [searchBrand, setSearchBrand] = React.useState<string>('');
    const [searchModel, setSearchModel] = React.useState<string>('');
    const [selectedBrand, setSelectedBrand] = React.useState<string>('');
    const [selectedModel, setSelectedModel] = React.useState<string>('');
    const [filteredBrands, setFilteredBrands] = React.useState<string[]>([]);
    const [filteredModels, setFilteredModels] = React.useState<string[]>([]);


    useEffect(() => {
        const loadBrands = async () => {
            const result = await fetchBrands();
            setBrands(result);
        };
        loadBrands();
    }, []);

    const loadModels = async () => {
        const result = await fetchModels(selectedBrand);
        setModels(result);
    };

    useEffect(() => {
        loadModels();
    }, []);

    const handleSearchBrand = (text: string) => {
        setSearchBrand(text);
        const filtered = brands.filter(m => m.toLowerCase().includes(text.toLowerCase()));
        setFilteredBrands(filtered);
    };

    const handleSearchModel = (text: string) => {
        setSearchModel(text);
    };

    useEffect(() => {
        const filtered = models.filter(m => m.toLowerCase().includes(searchModel.toLowerCase()));
        setFilteredModels(filtered);
    }, [models, searchModel]);

    const handleValidate = () => {
        setModalBrandsVisible(false);
        setModalModelsVisible(false);
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: route.params.picture }} style={styles.image} />
            <Pressable onPress={() => setModalBrandsVisible(true)} style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed
            ]}>
                <View style={styles.buttonContent}>
                    <Text style={[
                        styles.buttonText,
                        !selectedBrand && styles.placeholderText
                    ]}>
                        {selectedBrand || "Sélectionnez une marque"}
                    </Text>
                    <View style={styles.chevron}>
                        <Text style={styles.chevronText}>▼</Text>
                    </View>
                </View>
            </Pressable>
            <Pressable onPress={() => setModalModelsVisible(true)} style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed
            ]}>
                <View style={styles.buttonContent}>
                    <Text style={[
                        styles.buttonText,
                        !selectedBrand && styles.placeholderText
                    ]}>
                        {selectedModel || "Sélectionnez un modèle"}
                    </Text>
                    <View style={styles.chevron}>
                        <Text style={styles.chevronText}>▼</Text>
                    </View>
                </View>
            </Pressable>

            <Pressable
                onPress={() => navigation.navigate('CameraScreen', {
                    user_id: route.params.user_id,
                })}
                style={({ pressed }) => [
                    styles.button,
                    pressed && styles.buttonPressed
                ]}
            >

                <View style={styles.buttonContent}>
                    <Text style={styles.buttonText}>Valider</Text>
                </View>
            </Pressable>


            <Modal visible={modalBrandsVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <TextInput
                        placeholder="Rechercher une marque"
                        value={searchBrand}
                        onChangeText={handleSearchBrand}
                        style={styles.searchInput}
                    />

                    <FlatList
                        data={filteredBrands}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <Pressable
                                style={[
                                    styles.item,
                                    item === selectedBrand && styles.selectedItem,
                                ]}
                                onPress={() => setSelectedBrand(item)}
                            >
                                <Text>{item}</Text>
                            </Pressable>
                        )}
                    />

                    <Pressable onPress={() => { handleValidate(), loadModels() }} style={styles.validateButton}>
                        <Text style={styles.validateButtonText}>Valider</Text>
                    </Pressable>
                </View>
            </Modal>

            <Modal visible={modalModelsVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <TextInput
                        placeholder="Rechercher un modèle"
                        value={searchModel}
                        onChangeText={handleSearchModel}
                        style={styles.searchInput}
                    />

                    <FlatList
                        data={filteredModels}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <Pressable
                                style={[
                                    styles.item,
                                    item === selectedModel && styles.selectedItem,
                                ]}
                                onPress={() => setSelectedModel(item)}
                            >
                                <Text>{item}</Text>
                            </Pressable>
                        )}
                    />

                    <Pressable onPress={handleValidate} style={styles.validateButton}>
                        <Text style={styles.validateButtonText}>Valider</Text>
                    </Pressable>
                </View>
            </Modal>

        </View>
    )
};

export default PhotoDetailsScreen;

const styles = StyleSheet.create({
    image: { height: 300, width: 300, borderRadius: 5, alignContent: 'center', alignSelf: 'center', marginBottom: 20 },
    container: { flex: 1, padding: 16 },
    input: { borderWidth: 1, borderColor: '#ccc', marginVertical: 10, padding: 8 },
    picker: { height: 50, width: '100%' },
    button: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        minHeight: 56,
        justifyContent: 'center',
    },
    buttonPressed: {
        backgroundColor: '#F9FAFB',
        borderColor: '#6366F1',
        transform: [{ scale: 0.98 }],
        shadowOpacity: 0.12,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        flex: 1,
    },
    placeholderText: {
        color: '#9CA3AF',
        fontWeight: '500',
    },
    chevron: {
        marginLeft: 12,
        opacity: 0.6,
    },
    chevronText: {
        fontSize: 12,
        color: '#6B7280',
        fontWeight: '600',
    },

    // Styles modernes pour le modal
    modalContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
},

    searchInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
},

    item: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
},

    selectedItem: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
    borderWidth: 2,
    shadowColor: '#6366F1',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
},

    validateButton: {
    backgroundColor: '#6366F1',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    shadowColor: '#6366F1',
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
    minHeight: 56,
},

    validateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
},
});