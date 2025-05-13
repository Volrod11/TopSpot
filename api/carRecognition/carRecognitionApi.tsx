import axios from 'axios';
import { Buffer } from 'buffer';

// Définir l'URL de l'API Eyedea
const API_URL = 'https://api.eyedea.com/recognition';
const API_KEY = '2285820ad988d5bc7ee2794beedd5c099951f3dec24703715a306cdebd0e687b';  // Remplacez par votre clé API réelle

// Fonction pour convertir une image URL en base64
const fetchImageAsBase64 = async (imageUrl: string): Promise<string> => {
  const response = await axios.get(imageUrl, {
    responseType: 'arraybuffer',
  });
  const base64 = Buffer.from(response.data, 'binary').toString('base64');
  return `data:image/jpeg;base64,${base64}`; // Assurez-vous que le type MIME est correct
};

// Fonction pour envoyer la requête à l'API Eyedea
const recognizeModel = async (imageUrl: string) => {
  try {
    // Convertir l'image en base64
    const base64Image = await fetchImageAsBase64(imageUrl);
    
    // Envoyer la requête POST à l'API Eyedea
    const response = await axios.post(
      API_URL,
      {
        image: base64Image,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Retourner la réponse de l'API
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la reconnaissance du modèle:', error);
    throw error;
  }
};

export default recognizeModel;
