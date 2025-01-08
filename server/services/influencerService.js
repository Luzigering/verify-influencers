const Influencer = require('../models/Influencer');
const Claim = require('../models/Claim');

const calculateReliability = async () => {
  try {
    const influencers = await Influencer.findAll();

    for (const influencer of influencers) {
      const correctClaims = await Claim.count({
        where: { influencerId: influencer.id, isCorrect: true },
      });

      const totalClaims = await Claim.count({
        where: { influencerId: influencer.id },
      });

      // Atualiza as métricas de confiabilidade
      await Influencer.update(
        { correctClaims, totalClaims },
        { where: { id: influencer.id } }
      );
    }
  } catch (error) {
    console.error('Erro ao calcular confiabilidade:', error.message);
  }
};

const getRanking = async () => {
  try {
    return await Influencer.findAll({
      attributes: [
        'username', 'platform', 'followers', 'correctClaims', 'totalClaims',
        [sequelize.literal('correctClaims / NULLIF(totalClaims, 0)'), 'reliability'],
      ],
      order: [
        [sequelize.literal('reliability'), 'DESC'],
        ['followers', 'DESC'],
      ],
    });
  } catch (error) {
    console.error('Erro ao obter ranking:', error.message);
    return [];
  }
};

module.exports = { calculateReliability, getRanking };

