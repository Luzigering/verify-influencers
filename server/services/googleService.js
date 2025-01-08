const axios = require('axios');

const verifyClaim = async (claimText, trustedSources) => {
  try {
    const response = await axios.post('http://localhost:5001/similarity', {
      claim: claimText,
      sources: trustedSources,
    });

    const results = response.data;

    // Identificar a maior similaridade
    const bestMatch = results.reduce((max, curr) => (curr.similarity > max.similarity ? curr : max), { similarity: 0 });

    return {
      isVerified: bestMatch.similarity > 0.8,
      confidence: bestMatch.similarity,
    };
  } catch (error) {
    console.error('Erro ao verificar alegação:', error.message);
    return { isVerified: false, confidence: 0.0 };
  }
};

module.exports = { verifyClaim };
