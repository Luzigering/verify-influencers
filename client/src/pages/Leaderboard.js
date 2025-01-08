import React, { useEffect, useState } from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  const [influencers, setInfluencers] = useState([]);

  useEffect(() => {
    // Lógica para buscar dados do backend
    setInfluencers([
      { id: 1, name: 'Influencer 1', score: 95 },
      { id: 2, name: 'Influencer 2', score: 90 },
      { id: 3, name: 'Influencer 3', score: 85 },
    ]);
  }, []);

  return (
    <div className="leaderboard">
      <header className="leaderboard-header">
        <h1>Leaderboard</h1>
        <p>Os influenciadores mais confiáveis do momento.</p>
      </header>
      <div className="top-boxes">
        <div className="box">Confiável</div>
        <div className="box">Rápido</div>
        <div className="box">Transparente</div>
      </div>
      <section className="ranking">
        <h2>Ranking</h2>
        <table>
          <thead>
            <tr>
              <th>Influenciador</th>
              <th>Confiabilidade</th>
            </tr>
          </thead>
          <tbody>
            {influencers.map((influencer) => (
              <tr key={influencer.id}>
                <td>{influencer.name}</td>
                <td>{influencer.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Leaderboard;
