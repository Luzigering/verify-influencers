// Arquivo: controllers/claimController.js
const Influencer = require('../models/InfluencerModel');
const { extractHealthClaims, saveClaims } = require('../services/claimProcessingService');
// Arquivo: controllers/claimController.js
const Claim = require('../models/ClaimModel');
const { verifyClaims } = require('../services/verificationService');
const processInfluencerClaims = async (req, res) => {
  const { influencerId } = req.params;

  try {
    const influencer = await Influencer.findById(influencerId);
    if (!influencer) {
      return res.status(404).json({ error: 'Influenciador não encontrado' });
    }

    const claims = await extractHealthClaims(influencer.tweets);
    const savedClaims = await saveClaims(influencerId, claims);

    res.status(200).json(savedClaims);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar alegações' });
  }
};

const verifyInfluencerClaims = async (req, res) => {
    const { influencerId } = req.params;
  
    try {
      const claims = await Claim.find({ influencer: influencerId });
  
      if (!claims.length) {
        return res.status(404).json({ error: 'Nenhuma alegação encontrada para este influenciador' });
      }
  
      const verifiedClaims = await verifyClaims(claims);
  
      res.status(200).json(verifiedClaims);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao verificar alegações' });
    }
  };
  
module.exports = { processInfluencerClaims, verifyInfluencerClaims };
