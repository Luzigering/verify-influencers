import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchInfluencer } from '../services/api';
import './AdminPanel.css';

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    period: '',
    influencer: '',
    claims: '',
  });

  const [errorMessage, setErrorMessage] = useState(''); // Para exibir mensagens de erro
  const [loading, setLoading] = useState(false); // Para exibir estado de carregamento

  const navigate = useNavigate(); // Função de redirecionamento do React Router

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setErrorMessage(''); // Limpa mensagens de erro
    setLoading(true); // Inicia estado de carregamento

    try {
      console.log(formData); // Debug: Verifique se os dados estão corretos
      const response = await searchInfluencer(formData); // Envia os dados ao back-end

      if (response.data && response.data.id) {
        navigate(`/influencer/${response.data.id}`); // Redireciona para a página do influenciador
      } else {
        setErrorMessage('Influenciador não encontrado. Verifique os dados e tente novamente.');
        console.error('Erro: ID do influenciador não retornado.');
      }
    } catch (error) {
      setErrorMessage('Erro ao buscar influenciador. Tente novamente mais tarde.');
      console.error('Erro ao buscar influenciador:', error);
    } finally {
      setLoading(false); // Finaliza estado de carregamento
    }
  };

  return (
    <div className="admin-panel">
      <header className="header">
        <h1>Admin Panel</h1>
      </header>
      <main className="main-content">
        <div className="text-boxes">
          <form className="form-group">
            <label>
              Período de Tempo:
              <input
                type="text"
                name="period"
                value={formData.period}
                onChange={handleChange}
                placeholder="Ex: Últimos 30 dias"
              />
            </label>
            <label>
              Influenciador:
              <input
                type="text"
                name="influencer"
                value={formData.influencer}
                onChange={handleChange}
                placeholder="Nome do influenciador"
              />
            </label>
            <label>
              Número de Alegações:
              <input
                type="number"
                name="claims"
                value={formData.claims}
                onChange={handleChange}
                placeholder="Ex: 10"
              />
            </label>
            <button
              className="submit-btn"
              type="button"
              onClick={handleSubmit}
              disabled={loading} // Desativa o botão enquanto carrega
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Exibe erros */}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;



