// Arquivo: services/verificationService.js
const { searchDuckDuckGo } = require('../utils/duckduckgo');
const { searchWikipedia } = require('../utils/wikipedia');
const { cosineSimilarity } = require('../utils/similarity');


const searchSources = async (claimText) => {
  const results = [];

  // Busca no DuckDuckGo
  try {
    const ddgResults = await searchDuckDuckGo(claimText);
    results.push(...ddgResults);
  } catch (error) {
    console.error("Erro ao buscar no DuckDuckGo:", error.message);
  }

  // Busca na Wikipedia
  try {
    const wikipediaResults = await searchWikipedia(claimText);
    results.push(...wikipediaResults);
  } catch (error) {
    console.error("Erro ao buscar na Wikipedia:", error.message);
  }

  return results;
};

const verifyClaim = async (claimText) => {
  console.log(`Verificando alegação: "${claimText}"`);
  const sources = await searchSources(claimText);

  if (!sources || sources.length === 0) {
    return { status: "incerta", reason: "Nenhuma fonte confiável encontrada." };
  }

  let bestMatch = { similarity: 0, source: null };

  for (const source of sources) {
    const similarity = cosineSimilarity(claimText, source.snippet);
    if (similarity > bestMatch.similarity) {
      bestMatch = { similarity, source };
    }
  }

  if (bestMatch.similarity > 0.8) {
    return { status: "correta", source: bestMatch.source };
  } else if (bestMatch.similarity > 0.5) {
    return { status: "incerta", reason: "Similaridade baixa com fontes confiáveis." };
  } else {
    return { status: "incorreta", reason: "Nenhuma correspondência confiável encontrada." };
  }
};

const testVerification = async () => {
  const claims = [
    "Beber água com limão em jejum melhora a imunidade.",
    "Vacinas causam autismo.",
    "Comer cenoura melhora a visão.",
  ];

  for (const claim of claims) {
    const result = await verifyClaim(claim);
    console.log(`Alegação: "${claim}"`);
    console.log(`Resultado: ${JSON.stringify(result, null, 2)}`);
    console.log("\n");
  }
};

module.exports = { verifyClaim, testVerification };

/* Alternativa com API da Openai
// Arquivo: services/verificationService.js
const axios = require('axios');

// Lista de chaves de API do arquivo .env
const apiKeys = [
  process.env.OPENAI_API_KEY_1,
  process.env.OPENAI_API_KEY_2,
  process.env.OPENAI_API_KEY_3,
];

// Variável para controlar qual chave está sendo usada

let currentApiKeyIndex = 0;

const verifyClaim = async (claimText) => {
  const prompt = `Verifique a seguinte alegação de saúde e forneça um status (Verificado, Questionável, Desmascarado) 
  e uma pontuação de confiança (0 a 100) com base em fontes científicas confiáveis:
  "${claimText}"
  Formato da resposta: {"status": "status", "confidence": 0-100}`;

  while (currentApiKeyIndex < apiKeys.length) {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
        },
        {
          headers: { Authorization: `Bearer ${apiKeys[currentApiKeyIndex]}` },
        }
      );

      // Retorna a resposta processada com sucesso
      return JSON.parse(response.data.choices[0].message.content);
    } catch (error) {
      console.error(
        `Erro ao verificar alegação com a chave ${currentApiKeyIndex + 1}:`,
        error.message
      );

      // Alterna a chave apenas em caso de erro 429
      if (error.response?.status === 429) {
        console.warn("Limite de requisições excedido. Alternando para a próxima chave.");
        currentApiKeyIndex++;
      } else {
        // Para outros erros, retorna resposta padrão sem continuar
        console.error("Erro irreparável. Retornando resposta padrão.");
        return { status: 'Questionável', confidence: 50 };
      }
    }
  }

  // Se todas as chaves falharem, retorna um fallback
  console.error("Todas as chaves falharam. Retornando resposta padrão.");
  return { status: 'Questionável', confidence: 50 };
};

module.exports = { verifyClaim };
*/