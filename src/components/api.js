const APIKEY = import.meta.env.VITE_GECKO_API_KEY;

const api = () => {};

export const fetchCryptoData = async (itemsPerPage, page) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${itemsPerPage}&page=${page}&sparkline=false&x_cg_demo_api_key=${APIKEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export const searchCoins = async (searchQuery) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${searchQuery}&x_cg_demo_api_key=${APIKEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchCoinData = async (coin) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}?sparkline=false?x_cg_demo_api_key=${APIKEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchTop100 = async () => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false?x_cg_demo_api_key=${APIKEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export const fetchHistoricalData = async (coin, days) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/` +
        coin +
        `/market_chart?vs_currency=usd&days=${days}?x_cg_demo_api_key=${APIKEY}`
    );
    const data = await response.json();
    return data.prices.map(([time, price]) => ({ time, price }));
  } catch (error) {
    console.error("Error fetching historical data:", error);
  }
};
export default api;
