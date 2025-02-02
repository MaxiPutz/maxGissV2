"use client";

import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

/**
 * MeanTempChart Component
 *
 * @param {Object} props
 * @param {Array<Object>} props.data - Array of data objects
 * @param {String} props.stationName - Name of the station
 *
 * Each object in data should have the following properties:
 *   - YEAR: String or Number representing the year.
 *   - metANN: String or Number representing the mean temperature for that year.
 */
const MeanTempChart = ({ data, stationName }) => {
  // Filter out data with metANN values that are not valid (e.g. 999.9)
  const filteredData = data.filter((ele) => parseFloat(ele.metANN) < 120);

  const labels = filteredData.map((item) => item.YEAR);
  const temperatures = filteredData.map((item) => parseFloat(item.metANN));

  // State for autoScale toggle
  const [autoScale, setAutoScale] = useState(false);

  // Handler for checkbox toggle
  const handleAutoScaleChange = (e) => {
    setAutoScale(e.target.checked);
  };

  // If autoScale is enabled, compute min and max from the data; otherwise, use fixed values.
  const yMin = autoScale ? Math.min(...temperatures) : -20;
  const yMax = autoScale ? Math.max(...temperatures) : 20;
  // Optionally, compute a step size when autoscaling (here, simply divide the range by 5)
  const stepSize = autoScale ? (yMax - yMin) / 5 : 5;

  // Prepare data for Chart.js
  const chartData = {
    labels,
    datasets: [
      {
        label: "Mean Temperature (°C)",
        data: temperatures,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.4)",
        tension: 0.1,
      },
    ],
  };

  // Chart options including the dynamic or fixed y-axis scale
  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: "Mean Temperature of the Year",
      },
    },
    scales: {
      y: {
        min: yMin,
        max: yMax,
        ticks: {
          stepSize: stepSize,
        },
        title: {
          display: true,
          text: "Temperature (°C)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div
        className="grid"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          {stationName}
        </div>
        <div>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            <input
              type="checkbox"
              checked={autoScale}
              onChange={handleAutoScaleChange}
              style={{
                width: "20px",
                height: "20px",
                accentColor: "#4caf50", // Modern browsers support accentColor for checkbox styling
              }}
            />
            Auto Scale
          </label>
        </div>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MeanTempChart;
