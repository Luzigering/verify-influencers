// Arquivo: server.js
require('dotenv').config()
const express = require('express');
const influencerRoutes = require('./routes/influencerRoutes');
const claimRoutes = require('./routes/claimRoutes');
const sequelize = require('./config/database');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
const axios = require('axios');

axios.get('https://api.twitter.com/2/tweets/search/recent', { headers: { Bearer: `${process.env.TWITTER_BEARER}` } })
  .then(response => console.log('API funcionando:', response.data))
  .catch(err => console.error('Erro na API:', err.message));

app.get('/', (req, res) => res.send('Servidor funcionando!'));

app.use(express.json());
app.use('/api/influencers', influencerRoutes);
app.use('/api/claims', claimRoutes);
app.use('/dashboard', dashboardRoutes);

sequelize.authenticate().then(() => {
  console.log('Database connected');
  app.listen(3001, () => console.log('Server running on port 3000'));
});
;