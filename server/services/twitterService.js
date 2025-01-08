const { TwitterApi } = require('twitter-api-v2');
const Influencer = require('../models/Influencer');

// Configuração dos clientes Twitter (usando somente o cliente com bearer token para simplificar e seguir as melhores práticas)
const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN_1).readOnly;

async function fetchInfluencers(keywords) {
  const influencers = new Map();
  const errors = []; // Array para armazenar erros específicos por palavra-chave

  for (const keyword of keywords) {
    try {
      const { data, meta } = await twitterClient.v2.search(keyword, {
        max_results: 100, // Aumentei para o máximo permitido pela API v2 (100)
        "tweet.fields": "author_id", // Inclui o ID do autor para otimizar a busca
        expansions: "author_id", // Necessário para obter informações do usuário
        "user.fields": "username,public_metrics" // Campos desejados do usuário
      });

      if (data && data.length > 0) {
        // Busca os usuários expandidos (incluídos na resposta devido ao 'expansions')
        const users = meta.users || [];
        data.forEach(tweet => {
            const user = users.find(u => u.id === tweet.author_id);
          if (user && !influencers.has(user.username)) {
            influencers.set(user.username, {
              username: user.username,
              platform: 'Twitter',
              followers: user.public_metrics?.followers_count || 0, // Valor padrão 0 se não houver contagem
            });
          }
        });
      } else {
        console.warn(`Nenhum resultado encontrado para a palavra-chave: ${keyword}`);
      }
    } catch (error) {
      console.error(`Erro ao buscar influenciadores para "${keyword}":`, error);
      errors.push({ keyword, error: error.message }); // Armazena detalhes do erro
    }
  }

  // Salva os influenciadores no banco de dados (com tratamento de erros)
  for (const influencer of influencers.values()) {
    try {
      await Influencer.create(influencer);
      console.log(`Influenciador ${influencer.username} salvo no banco de dados.`);
    } catch (dbError) {
      console.error(`Erro ao salvar influenciador ${influencer.username} no banco de dados:`, dbError);
    }
  }

    if (errors.length > 0) {
        console.error("Erros encontrados durante a busca:", errors);
    }

    return { savedInfluencers: influencers.size, errors }; // Retorna informações sobre o processo
}

module.exports = { fetchInfluencers };