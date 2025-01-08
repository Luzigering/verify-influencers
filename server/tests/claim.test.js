const SequelizeMock = require('sequelize-mock');
const dbMock = new SequelizeMock();
const Claim = dbMock.define('Claim', {
  text: 'Beber água diariamente melhora a saúde.',
  category: 'Nutrição',
  isVerified: true,
  confidence: 0.95,
});

describe('Claim Model', () => {
  it('Deve criar uma alegação com sucesso', async () => {
    const claim = await Claim.create({
      text: 'Exercícios ajudam na saúde mental.',
      category: 'Psicologia',
      isVerified: false,
      confidence: 0.5,
    });

    expect(claim.text).toBe('Exercícios ajudam na saúde mental.');
    expect(claim.category).toBe('Psicologia');
    expect(claim.isVerified).toBe(false);
    expect(claim.confidence).toBe(0.5);
  });
});
