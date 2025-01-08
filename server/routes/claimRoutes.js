const express = require('express');
const router = express.Router();
const Claim = require('../models/Claim');
const { processClaims } = require('../services/claimService');

router.get('/verify', async (req, res) => {
  const claims = await Claim.findAll({ where: { isVerified: false } });
  await processClaims(claims);
  res.json({ message: 'Claims processed successfully' });
});;

module.exports = router;

