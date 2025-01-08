const express = require('express');
const router = express.Router();

// Simulação de estatísticas para o Dashboard
router.get('/stats', (req, res) => {
  res.json({
    influencersCount: 12,
    claimsVerified: 87,
    claimsDebunked: 14,
    categories: {
      Nutrition: 40,
      Medicine: 30,
      MentalHealth: 20,
      Fitness: 10,
    },
  });
});

module.exports = router;
