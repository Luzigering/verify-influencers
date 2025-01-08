import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import './InfluencerPage.css';
const InfluencerPage = () => {
  const { id } = useParams();
  const [influencer, setInfluencer] = useState(null);
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    // Busca os dados do influenciador e suas alegações
    const fetchInfluencerData = async () => {
      try {
        const response = await api.get(`/influencers/${id}`);
        setInfluencer(response.data.influencer);
        setClaims(response.data.claims);
      } catch (error) {
        console.error('Erro ao buscar dados do influenciador:', error);
      }
    };

    fetchInfluencerData();
  }, [id]);

  if (!influencer) return <div>Carregando...</div>;

  return (
    <div>
      <header>
        <img src={influencer.profileImageUrl} alt={influencer.name} />
        <h1>{influencer.name}</h1>
        <p>{influencer.bio}</p>
        <p>Seguidores: {influencer.followersCount}</p>
      </header>
      <section>
        <h2>Alegações</h2>
        {claims.map((claim) => (
          <div key={claim.id}>
            <p>{claim.text}</p>
            <p>Status: {claim.verificationStatus}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default InfluencerPage;



