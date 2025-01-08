const request = require('supertest');
const express = require('express');
const claimRoutes = require('../../routes/claimRoutes');

const app = express();
app.use('/api/claims', claimRoutes);

describe('Rota de Alegações', () => {
  it('Deve processar alegações e retornar sucesso', async () => {
    const response = await request(app).get('/api/claims/verify');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Claims processed successfully');
  });
});
