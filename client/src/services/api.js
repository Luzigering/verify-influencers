import axios from 'axios';

// Instância do Axios com configuração padrão
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL , // URL do backend
  timeout: 5000, // Tempo limite para requisições (5 segundos)
});

// Funções reutilizáveis para as APIs
export const fetchInfluencers = async () => {
  return api.get('/influencers');
};

export const fetchClaims = async (influencerId) => {
  return api.get(`/influencers/${influencerId}`);
};

export const searchInfluencer = async (formData) => {
  try {
    // Adicione o token manualmente
    const token = `${process.env.TWITTER_BEARER_TOKEN_1}`; // Substitua pelo token obtido no login
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/influencers/search`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Enviando o token no cabeçalho
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export default api;

