// src/hooks/useUserLocation.js
import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function useUserLocation(lowAccuracy: boolean) {
  const [location, setLocation] = useState(null);      // { latitude, longitude }
  const [errorMsg, setErrorMsg] = useState(null);      // Message d'erreur
  const [loading, setLoading] = useState(true);        // Pour savoir si c'est en cours

  useEffect(() => {
    (async () => {
      try {
        // Demander l'autorisation à l'utilisateur
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission de localisation refusée.");
          setLoading(false);
          return;
        }

        // Récupérer la position actuelle
        const position = await Location.getCurrentPositionAsync({
          accuracy: lowAccuracy ? Location.Accuracy.Balanced : Location.Accuracy.High,
          timeInterval: 1000,
        });


        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { location, errorMsg, loading };
}
