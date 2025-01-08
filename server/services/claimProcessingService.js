// Arquivo: services/claimProcessingService.js
const OpenAI = require('openai');
const Claim = require('../models/Claim');

const apiKeys = [
  process.env.OPENAI_API_KEY_1,
  process.env.OPENAI_API_KEY_2,
  process.env.OPENAI_API_KEY_3,
];

const openai = new OpenAI({
  apiKey: apiKeys[0],
});

const fetchTweets = async (tweets) => {
  const claims = [];

  for (const tweet of tweets) {
    const prompt = `Extraia alegações relacionadas à saúde do seguinte texto e categorize-as:
    Texto: "${tweet.text}"
    Responda no formato JSON: [{"text": "alegação", "category": "categoria"}]`;

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300,
        temperature: 0.7,
      });

      // Validação e parsing do JSON retornado
      const extracted = JSON.parse(response.data.choices[0].message.content);
      claims.push(...extracted);
    } catch (error) {
      console.error('Erro ao processar alegações:', error.message);
      // Fallback para processar manualmente ou logar o tweet problemático
      claims.push({
        text: tweet.text,
        category: "não categorizado",
        error: true,
      });
    }
  }

  return claims;
};


const saveClaims = async (influencerId, claims) => {
  const savedClaims = [];

  for (const claim of claims) {
    const newClaim = new Claim({
      text: claim.text,
      category: claim.category,
      influencer: influencerId,
    });

    await newClaim.save();
    savedClaims.push(newClaim);
  }

  return savedClaims;
};
const verifyClaim = (req, res) => {
  // Aqui você lida com a lógica para verificar a alegação
  res.send("Alegação verificada!");
};

module.exports = { fetchTweets, saveClaims, verifyClaim };
