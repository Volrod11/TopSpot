import axios from 'axios';

interface RecognitionOptions {
  detect_faces: boolean;
  detect_text: boolean;
}

interface RecognizeResponse {
  faces: Array<any>;
  text: Array<any>;
  request_id: string;
}

export const carRecognitionApiClient = async (
  base64Image: string,
  options: RecognitionOptions,
  apiKey: string
): Promise<RecognizeResponse> => {
  const url = "https://api.eyedea.com/mmr/v1/recognize";

  try {
    const response = await axios.post<RecognizeResponse>(
      url,
      {
        image: base64Image,
        options: options
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error recognizing image:', error);
    throw error;
  }
};
