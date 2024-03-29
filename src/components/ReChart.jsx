import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { fetchHistoricalData } from "./api";
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const date = new Date(label);
    const formattedDate = `${date.toLocaleDateString()} ${date.getHours()}:${
      (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
    }`;
    return (
      <div className="custom-tooltip rounded-lg bg-white dark:bg-gray-800 shadow p-2">
        <p className="intro">{` ${payload[0].value}`}</p>
        <p className="label w-full text-end text-gray-500 text-sm text-uppercase">{`${formattedDate}`}</p>
      </div>
    );
  }

  return null;
};
function CustomizedTick({ timeframe, ...props }) {
  const { x, y, stroke, payload } = props;

  const date = new Date(payload?.value);
  console.log(timeframe);
  let content;
  if (timeframe === 1) {
    const formattedTime = date.toLocaleTimeString("en", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
    content = (
      <text x={0} y={0} dy={16} fill="#666">
        <tspan textAnchor="middle" x="0">
          {formattedTime}
        </tspan>
      </text>
    );
  } else if (timeframe <= 7) {
    const formattedDate = date.toLocaleDateString("it", {
      day: "2-digit",
      month: "2-digit",
    });

    content = (
      <text x={0} y={0} dy={16} fill="#666">
        <tspan textAnchor="middle" x="0">
          {formattedDate}
        </tspan>
      </text>
    );
  } else if (timeframe >= 60) {
    const formattedDate = date.toLocaleDateString("it", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
    content = (
      <text x={0} y={0} dy={16} fill="#666">
        <tspan textAnchor="middle" x="0">
          {formattedDate}
        </tspan>
      </text>
    );
  }

  return <g transform={`translate(${x},${y})`}>{content}</g>;
}

const ReChart = ({ id, timeframe }) => {
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    fetchHistoricalData(id, timeframe)
      .then(setHistoricalData)
      .catch((error) => console.error("Error fetching crypto data:", error));
  }, [timeframe]);

  const formatYAxis = (tickItem) => {
    return tickItem >= 1000 ? `${(tickItem / 1000).toFixed(2)}k` : tickItem;
  };

  return (
    <div className="w-full h-full">
      <div className="chart h-full w-full p-2 ">
        <ResponsiveContainer width="99%">
          <LineChart
            className={"p-2"}
            data={historicalData}
            margin={{
              top: 15,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              allowDataOverflow
              dataKey="time"
              domain={["dataMin", "dataMax"]}
              type="number"
              tick={<CustomizedTick timeframe={timeframe} />}
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
          </LineChart>{" "}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReChart;
