// Arquivo: utils/wikipedia.js
const axios = require('axios');

const searchWikipedia = async (query) => {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
    query
  )}&format=json`;

  try {
    const response = await axios.get(url);
    return response.data.query.search.map((result) => ({
      title: result.title,
      snippet: result.snippet.replace(/<\/?[^>]+(>|$)/g, ""), // Remove tags HTML
      link: `https://en.wikipedia.org/wiki/${encodeURIComponent(result.title)}`,
    }));
  } catch (error) {
    console.error("Erro ao buscar na Wikipedia:", error.message);
    throw new Error("Falha ao buscar na Wikipedia.");
  }
};

module.exports = { searchWikipedia };
