const { verifyClaim } = require('../services/googleService');
const axios = require('axios');

jest.mock('axios');

describe('Google Service', () => {
  it('Deve verificar uma alegação com sucesso', async () => {
    axios.post.mockResolvedValue({
      data: [
        { source: 'Fonte confiável', similarity: 0.9 },
        { source: 'Outra fonte', similarity: 0.7 },
      ],
    });

    const result = await verifyClaim('Beber água melhora a saúde.', [
      'Fonte confiável',
      'Outra fonte',
    ]);

    expect(result.isVerified).toBe(true);
    expect(result.confidence).toBeGreaterThan(0.8);
  });
});
