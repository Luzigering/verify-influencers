import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InfluencerRanking = () => {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ranking'); // Ajuste a URL se necessário
        setRanking(response.data);
      } catch (error) {
        console.error('Erro ao buscar o ranking:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  if (loading) {
    return <div>Carregando ranking...</div>;
  }

  return (
    <div>
      <h1>Ranking de Influenciadores</h1>
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Usuário</th>
            <th>Plataforma</th>
            <th>Seguidores</th>
            <th>Alegações Corretas</th>
            <th>Total de Alegações</th>
            <th>Confiabilidade</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((influencer, index) => (
            <tr key={influencer.username}>
              <td>{index + 1}</td>
              <td>{influencer.username}</td>
              <td>{influencer.platform}</td>
              <td>{influencer.followers}</td>
              <td>{influencer.correctClaims}</td>
              <td>{influencer.totalClaims}</td>
              <td>
                {influencer.totalClaims > 0
                  ? ((influencer.correctClaims / influencer.totalClaims) * 100).toFixed(2) + '%'
                  : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InfluencerRanking;
