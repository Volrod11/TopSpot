import { View, Text } from "react-native";
import NewGarageCard from "./NewGarageCard";
import { useEffect, useState } from "react";
import { Garage_with_pictures_and_description } from "../../../types";
import { fetchHomePageGarages } from "../../../utils/fetchHomePageGarages";
import Garage from "./Garage";
import Top1Garage from "./Top1Garage";





export default function GarageOfTheMonth() {
    const now = new Date();
    // premier jour du mois actuel
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    // différence en millisecondes → jours
    const diffDays = Math.floor((now.getTime() - startOfMonth.getTime()) / (1000 * 60 * 60 * 24));
    const isFirstWeek = diffDays < 7; // true si moins de 7 jours

    const [garageInfos, setGarageInfos] = useState<Garage_with_pictures_and_description>(null);
    const [displayBestGarage, setDisplayBestGarage] = useState(false);

    useEffect(() => {
        if (!isFirstWeek) {
            async function fetchBestGarageInfosFromDataBase() {
                const loadedGarageInfos = await fetchHomePageGarages('likes', null, false, false, 'monthly', true, 1, 0, null);

                if (loadedGarageInfos.length > 0) {
                    setGarageInfos(loadedGarageInfos[0]);
                };
            }

            fetchBestGarageInfosFromDataBase();
        }
    }, [isFirstWeek]);

    useEffect(() => {
        if (garageInfos !== null && !isFirstWeek) {
            setDisplayBestGarage(true);
        }
    }, [garageInfos]);


    return (
        <View>
            {displayBestGarage ?
                <Top1Garage>
                    <Garage garage={garageInfos} />
                </Top1Garage>
                : <NewGarageCard />}
        </View>
    );
}