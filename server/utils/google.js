// Arquivo: utils/google.js
const axios = require('axios');

const searchGoogle = async (query) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;
  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
    query
  )}&key=${apiKey}&cx=${searchEngineId}`;

  try {
    const response = await axios.get(url);
    return response.data.items.map((item) => ({
      title: item.title,
      snippet: item.snippet,
      link: item.link,
    }));
  } catch (error) {
    console.error("Erro ao buscar no Google:", error.message);
    throw new Error("Falha ao buscar fontes no Google.");
  }
};

module.exports = { searchGoogle };
