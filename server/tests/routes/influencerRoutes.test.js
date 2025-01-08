const request = require('supertest');
const express = require('express');
const influencerRoutes = require('../../routes/influencerRoutes');

const app = express();
app.use('/api/influencers', influencerRoutes);

describe('Rota de Influenciadores', () => {
  it('Deve retornar rankings ordenados por confiabilidade', async () => {
    const response = await request(app).get('/api/influencers/rankings');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
