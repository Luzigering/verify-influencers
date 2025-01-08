import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import api from '../services/api'
const Dashboard = () => {
  const [stats, setStats] = useState({
    influencersCount: 0,
    claimsVerified: 0,
    claimsDebunked: 0,
  });

  const [topInfluencers, setClaimCategories] = useState([]);

  useEffect(() => {
    // Simula chamada para buscar dados do backend
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/stats'); // Endpoint do backend
        setStats({
          influencersCount: response.data.influencersCount,
          claimsVerified: response.data.claimsVerified,
          claimsDebunked: response.data.claimsDebunked,
        });
        setClaimCategories(response.data.categories);
      } catch (error) {
        console.error('Erro ao buscar dados do backend:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Resumo das métricas e status do sistema.</p>
      </header>
      <main className="dashboard-main">
        <div className="stats-grid">
          <div className="stat-card">
            <h2>{stats.influencersCount}</h2>
            <p>Influenciadores</p>
          </div>
          <div className="stat-card">
            <h2>{stats.claimsVerified}</h2>
            <p>Alegações Verificadas</p>
          </div>
          <div className="stat-card">
            <h2>{stats.claimsDebunked}</h2>
            <p>Alegações Desmascaradas</p>
          </div>
        </div>
        <section className="top-influencers">
          <h2>Top Influenciadores</h2>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Confiabilidade</th>
              </tr>
            </thead>
            <tbody>
              {topInfluencers.map((influencer) => (
                <tr key={influencer.id}>
                  <td>{influencer.name}</td>
                  <td>{influencer.credibilityScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <div className="actions">
          <button>Configurar Pesquisa</button>
          <button>Visualizar Leaderboard</button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;



