import api from './api';

// Get all AMCs
export const getAMCs = async () => {
  const response = await api.get('/funds/');
  return response.data;
};

// Get schemes for an AMC
export const getSchemes = async (amcUuid) => {
  const response = await api.get(`/funds/schemes/${amcUuid}`);
  return response.data;
};

// Get details for a specific scheme
export const getSchemeDetails = async (schemeCode) => {
  const response = await api.get(`/funds/details/${schemeCode}`);
  return response.data;
};

// Get user portfolio
export const getPortfolio = async () => {
  const response = await api.get('/portfolio');
  return response.data;
};

// Invest in a scheme
export const investInScheme = async (schemeUuid, amount) => {
  const response = await api.post('/portfolio/invest', { schemeUuid, amount });
  return response.data;
};

// Update portfolio value
export const updatePortfolioValue = async () => {
  const response = await api.put('/portfolio/update-value');
  return response.data;
};