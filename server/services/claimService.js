const Claim = require('../models/Claim');
const { verifyClaim } = require('./googleService');

// Fontes confiáveis (substitua por sua lista real)
const trustedSources = [
  "Beber água é essencial para a saúde.",
  "Dormir bem melhora a qualidade de vida.",
  "Exercícios físicos ajudam no controle do peso."
];

const processClaims = async (claims) => {
  for (const claim of claims) {
    const { isVerified, confidence } = await verifyClaim(claim.text, trustedSources);
    await Claim.update({ isVerified, confidence }, { where: { id: claim.id } });
  }
};

module.exports = { processClaims };

