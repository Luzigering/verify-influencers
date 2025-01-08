const mockCreate = jest.fn();

jest.mock('../models/Influencer', () => ({
  create: mockCreate,
}));

jest.mock('twitter-api-v2', () => {
  return {
    TwitterApi: jest.fn(() => ({
      v2: {
        search: jest.fn().mockResolvedValue({
          data: [
            { username: 'user1', public_metrics: { followers_count: 1000 } },
            { username: 'user2', public_metrics: { followers_count: 2000 } },
          ],
        }),
      },
    })),
  };
});

const { findInfluencers } = require('../services/twitterService');

describe('Twitter Service', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpe mocks entre os testes
  });

  it('Deve buscar influenciadores com palavras-chave específicas', async () => {
    await findInfluencers(['saúde', 'nutrição']);
    
    // Valide o número de chamadas
    expect(mockCreate).toHaveBeenCalledTimes(2);
    
    // Valide os dados criados
    expect(mockCreate).toHaveBeenCalledWith({
      username: 'user1',
      platform: 'Twitter',
      followers: 1000,
    });
    expect(mockCreate).toHaveBeenCalledWith({
      username: 'user2',
      platform: 'Twitter',
      followers: 2000,
    });
  });
});
