// Arquivo: utils/duckduckgo.js
const axios = require('axios');

const searchDuckDuckGo = async (query) => {
  const url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1`;
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    // Processar o resultado (não oficial, então pode variar)
    if (!response.data || !response.data.results) {
      throw new Error("Nenhum resultado encontrado.");
    }

    return response.data.results.map((item) => ({
      title: item.title,
      snippet: item.body,
      link: item.url,
    }));
  } catch (error) {
    console.error("Erro ao buscar no DuckDuckGo:", error.message);
    throw new Error("Falha ao buscar no DuckDuckGo.");
  }
};

module.exports = { searchDuckDuckGo };
