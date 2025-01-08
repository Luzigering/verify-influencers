beforeAll(async () => {
    try {
      await sequelize.authenticate();
      console.log('Conexão com o banco de dados bem-sucedida.');
    } catch (error) {
      console.error('Erro ao conectar-se ao banco de dados:', error);
      throw error;
    }
  });;
  

afterAll(async () => {
    const { sequelize } = require('./config/database'); // Exemplo de Sequelize
    await sequelize.close();
  });
  afterAll(async () => {
    await sequelize.close();
    console.log('Conexão com o banco de dados encerrada.');
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  
  