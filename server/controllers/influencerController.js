// Arquivo: controllers/influencerController.js
const Influencer = require('../models/InfluencerModel');
const { fetchTweets } = require('../services/twitterService');

// Função para buscar dados do influenciador
const getInfluencerData = async (req, res) => {
  const { name } = req.params;
  try {
    const tweets = await fetchTweets(name);
      // Verifica se o influenciador já está no banco
      let influencer = await Influencer.findOne({ name });
      if (!influencer) {
        influencer = new Influencer({ name, tweets });
      } else {
        influencer.tweets = tweets; // Atualiza os tweets
      }
  
      await influencer.save();
  
      res.status(200).json(influencer);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados do influenciador' });
  }
};

module.exports = { getInfluencerData };
