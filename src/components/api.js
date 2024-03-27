const APIKEY = import.meta.env.VITE_GECKO_API_KEY;

const api = () => {};
export const fetchData = async () => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${searchQuery}&x_cg_demo_api_key=${APIKEY}`
    );
    const data = await response.json();
    setFilteredResults(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
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

export default api;
