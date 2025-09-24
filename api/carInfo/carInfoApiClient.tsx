import axios from 'axios';

const carInfoApiClient = axios.create({
  baseURL: 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?limit=20', // URL de base pour l'API des utilisateurs
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default carInfoApiClient;
