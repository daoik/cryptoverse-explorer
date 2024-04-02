const URL = import.meta.env.VITE_API_URL;
const api = () => {};

export const fetchCryptoData = async (itemsPerPage, page) => {
  try {
    const response = await fetch(
      `${URL}api/coins?per_page=${itemsPerPage}&page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export const searchCoins = async (searchQuery) => {
  try {
    const response = await fetch(`${URL}api/search?query=${searchQuery}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchCoinData = async (coin) => {
  try {
    const response = await fetch(`${URL}api/coins/${coin}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchTop100 = async () => {
  try {
    const response = await fetch(`${URL}api/coins/top100`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export const fetchHistoricalData = async (coin, days) => {
  try {
    const response = await fetch(
      `${URL}api/coins/${coin}/history?days=${days}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching historical data:", error);
  }
};
export default api;
