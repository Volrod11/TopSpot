import axios from "axios";

/**
 * Récupère la ville et la région à partir de coordonnées GPS
 * @param {number} longitude
 * @param {number} latitude
 * @returns {Promise<{city: string|null, region: string|null}>}
 */
export async function getCityRegionFromCoords(longitude, latitude) {  
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`;
    
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "TopSpotApp/1.0 (garricastres@gmail.com)"
      },
      timeout: 5000
    });

    const address = response.data.address || {};

    const city =
      address.city || address.town || address.village || address.hamlet || null;
    const region = address.state || address.region || null;

    return { city, region };
  } catch (err) {
    console.error("Erreur getCityRegionFromCoords:", err);
    return { city: null, region: null };
  }
}
