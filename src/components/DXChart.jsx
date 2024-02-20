import React, { useState, useEffect, useMemo } from "react";
import { generateCandlesData, createChart } from "@devexperts/dxcharts-lite";
const APIKEY = import.meta.env.VITE_GECKO_API_KEY;

const DXChart = ({ id }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [chartType, setChartType] = useState("bar");

  const ChartDropdown = () => {
    const handleChartTypeChange = (event) => {
      setChartType(event.target.value);
    };

    return (
      <select value={chartType} onChange={handleChartTypeChange}>
        <option value="candle">Candle</option>
        <option value="bar">Bar</option>
        <option value="line">Line</option>
        <option value="area">Area</option>
        <option value="scatterPlot">ScatterPlot</option>
        <option value="hollow">Hollow</option>
        <option value="histogram">Histogram</option>
        <option value="baseline">Baseline</option>
        <option value="trend">Trend</option>
      </select>
    );
  };
  useEffect(() => {
    // const fetchHistoricalData = async () => {
    //   try {
    //     const response = await fetch(
    //       `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=2?x_cg_demo_api_key=${APIKEY}`
    //     );
    //     const data = await response.json();
    //     setHistoricalData(data.prices);
    //     console.log(data.prices.length);
    //   } catch (error) {
    //     console.error("Error fetching historical data:", error);
    //   }
    // };
    // fetchHistoricalData();
  }, [id]);
  const candles = useMemo(
    () => generateCandlesData({ withVolume: true }),
    [id]
  );
  useEffect(() => {
    //   if (historicalData.length > 150) {
    //     const container = document.getElementById("chart_container");
    //     const chart = DXChart.createChart(container);
    //     const candlesData = historicalData.map(([timestamp, price]) => ({
    //       time: new Date(timestamp),
    //       value: price,
    //     }));
    //     chart.setData({ candles: candlesData });

    const container = document.getElementById("chart_container");
    const chart = createChart(container);
    chart.setChartType(chartType);

    chart.setData({ candles });
  }, [historicalData, chartType]);

  return (
    <div className="crypto-details">
      <ChartDropdown />
      <h2>Historical Data</h2>
      <div
        id="chart_container"
        style={{ width: "100%", height: "500px" }}
      ></div>
    </div>
  );
};

export default DXChart;
