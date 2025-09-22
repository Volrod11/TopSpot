import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import PicturesList from "./PicturesList";
import { supabase } from "../../lib/supabase";
import { fetchFilteredPictures, fetchNearByPictures } from "../../utils/getPicturesPage";
import { FetchFunction, HomeScreenStackParamList, Picture } from "../../types";
import { RouteProp, useRoute } from "@react-navigation/native";

type PicturesPageProps = {
    fetchFunction: "filtered" | "nearby",  //'filtered' ou 'nearby'
    user_id?: string | null,
    brand?: string | null,
    period?: string | null,
    query?: string | null,
    sort_by?: string | null,
    category?: string | null,
    city?: string | null,
    region?: string | null,
    limit?: number | null,
    offset?: number | null,
}

export default function PicturesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const route = useRoute<RouteProp<HomeScreenStackParamList, "PicturesPage">>();
    const {
        fetchFunction,
        user_id = null,
        brand = null,
        period = null,
        query = null,
        sort_by = null,
        category = null,
        city = null,
        region = null,
        limit = 25,
        offset = 0,
    } = route.params;


    const fetchImageWrapper = async (limit: number, offset: number) => {
        let images: Picture[] = [];
        if (fetchFunction === "filtered") {
            console.log("ok1");
            
            return fetchFilteredPictures(user_id, brand, period, query, sort_by, category, limit, offset);
        } else {
            if (fetchFunction === "nearby") {
                console.log("ok2");
                return fetchNearByPictures(city, region, limit, offset);
            } else {
                console.error("Erreur de type de fonction de recupèration d'images");
            }
        }

        return images;
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Rechercher une photo, un modèle, une marque..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    returnKeyType="search"
                    onSubmitEditing={Keyboard.dismiss}
                />

                <PicturesList fetchImages={fetchImageWrapper} />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingTop: 10,
    },
    searchBar: {
        backgroundColor: "#f0f0f0",
        marginHorizontal: 15,
        marginBottom: 10,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 12,
        fontSize: 16,
    },
});
