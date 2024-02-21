import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";
const APIKEY = import.meta.env.VITE_GECKO_API_KEY;
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const date = new Date(label);
    const formattedDate = `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}`;
    return (
      <div className="custom-tooltip rounded-lg bg-white dark:bg-gray-800 shadow p-2">
        <p className="intro">{` ${payload[0].value}`}</p>
        <p className="label w-full text-end text-gray-500 text-sm text-uppercase">{`${formattedDate}`}</p>
      </div>
    );
  }

  return null;
};

const ReChart = ({ id }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [refAreaLeft, setRefAreaLeft] = useState("");
  const [refAreaRight, setRefAreaRight] = useState("");
  const [left, setLeft] = useState("dataMin");
  const [right, setRight] = useState("dataMax");
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/` +
            id +
            `/market_chart?vs_currency=usd&days=1?x_cg_demo_api_key=${APIKEY}`
        );
        const data = await response.json();
        setHistoricalData(
          data.prices.map(([time, price]) => ({ time, price }))
        );
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };
    fetchHistoricalData();
  }, [id]);

  const formatXAxis = (tickItem) => {
    return new Date(tickItem).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const formatYAxis = (tickItem) => {
    return tickItem >= 1000 ? `${(tickItem / 1000).toFixed(2)}k` : tickItem;
  };

  const zoom = () => {
    if (refAreaLeft === refAreaRight || refAreaRight === "") {
      setRefAreaLeft("");
      setRefAreaRight("");
      return;
    }

    if (refAreaLeft > refAreaRight) setRefAreaLeft("");
    setRefAreaRight("");
    setLeft(refAreaLeft);
    setRight(refAreaRight);
    setZoomed(true);
  };

  const zoomOut = () => {
    setRefAreaLeft("");
    setRefAreaRight("");
    setLeft("dataMin");
    setRight("dataMax");
    setZoomed(false);
  };

  return (
    <div className="chart h-full w-full p-3 ">
      {zoomed && (
        <button type="button" onClick={zoomOut}>
          Zoom Out
        </button>
      )}{" "}
      <ResponsiveContainer width="99%">
        <LineChart
          height={400}
          width={600}
          data={historicalData}
          margin={{
            top: 15,
            right: 30,
            left: 0,
            bottom: 5,
          }}
          // onMouseDown={(e) => setRefAreaLeft(e.activeLabel)}
          // onMouseMove={(e) => refAreaLeft && setRefAreaRight(e.activeLabel)}
          // onMouseUp={zoom}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDataOverflow
            dataKey="time"
            domain={[left, right]}
            type="number"
            tickFormatter={formatXAxis}
            dy={10}
          />
          <YAxis
            allowDataOverflow
            dataKey="price"
            domain={["dataMin-10", "dataMax+10"]}
            tickFormatter={formatYAxis}
            dx={-10}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            name={id.toUpperCase() + "/USD"}
            type="natural"
            dataKey="price"
            stroke="#8884d8"
            activeDot={{ r: 4 }}
            dot={false}
          />
          {refAreaLeft && refAreaRight ? (
            <ReferenceArea
              x1={refAreaLeft}
              x2={refAreaRight}
              strokeOpacity={0.3}
            />
          ) : null}
        </LineChart>{" "}
      </ResponsiveContainer>
    </div>
  );
};

export default ReChart;
