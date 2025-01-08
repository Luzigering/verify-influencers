// Arquivo: routes/influencerRoutes.js
// routes/influencerRoutes.js
const express = require('express');
const router = express.Router();
const { Influencer } = require('../models/Influencer'); // Modelo do Influenciador
const { Op } = require('sequelize');

// POST /influencers/search
router.post('/search', async (req, res) => {
  try {
    const { timePeriod, influencerName, allegationsCount } = req.body;

    // Filtro de período (Ex.: últimos 30 dias)
    const dateFilter = timePeriod
      ? { createdAt: { [Op.gte]: new Date(Date.now() - parseInt(timePeriod) * 24 * 60 * 60 * 1000) } }
      : {};

    // Filtro de nome do influenciador
    const nameFilter = influencerName ? { username: { [Op.iLike]: `%${influencerName}%` } } : {};

    // Filtro do número de alegações (Ex.: > 10)
    const allegationFilter = allegationsCount
      ? { allegationsCount: { [Op.gte]: parseInt(allegationsCount) } }
      : {};

    // Combinar filtros
    const filters = {
      where: {
        ...dateFilter,
        ...nameFilter,
        ...allegationFilter,
      },
    };

    const influencers = await Influencer.findAll(filters);
    res.json(influencers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar influenciadores.' });
  }
});

module.exports = router;

