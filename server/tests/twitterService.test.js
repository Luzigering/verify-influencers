const { findInfluencers } = require('../services/twitterService');
jest.mock('../models/Influencer');

describe('Twitter Service', () => {
  it('Deve buscar influenciadores com palavras-chave específicas', async () => {
    const mockCreate = jest.fn();
    jest.mock('../models/Influencer', () => ({
      create: mockCreate,
    }));
    
    await findInfluencers(['saúde', 'nutrição']);
    
  });
});
jest.mock('twitter-api-v2', () => {
  return {
    TwitterApi: jest.fn(() => ({
      v2: {
        search: jest.fn().mockResolvedValue({
          data: [
            {
              username: 'user1',
              id: '1',
              public_metrics: { followers_count: 1000 },
            },
            {
              username: 'user2',
              id: '2',
              public_metrics: { followers_count: 200 },
            },
          ],
        }),
      },
    })),
  };
});
