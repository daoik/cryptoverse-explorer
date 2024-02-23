// CryptoApi.js
import { useState, useEffect } from "react";
import { debounce } from "lodash";
import CryptoApi from "./scripts/CryptoApi";
const APIKEY = import.meta.env.VITE_GECKO_API_KEY;

const CryptoApi = ({ searchQuery, setSearchResults, setFilteredResults }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/search?query=${searchQuery}&x_cg_demo_api_key=${APIKEY}`
        );
        const data = await response.json();
        setSearchResults(data);
        setFilteredResults(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const debouncedFetchData = debounce(fetchData, 300);
    if (searchQuery !== "") {
      debouncedFetchData();
    } else {
      setSearchResults([]);
      setFilteredResults([]);
    }

    return () => {
      debouncedFetchData.cancel();
    };
  }, [searchQuery, setSearchResults, setFilteredResults]);

  return null;
};

export default CryptoApi;
