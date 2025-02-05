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
 * @type {Record<StationDataVersion,string>}
 */
const colorMap = {
  v2Combi: "rgba(54,162,235,1)",   // Blue
  v2Raw: "rgba(255,99,132,1)",     // Red
  v2Homogen: "rgba(75,192,192,1)", // Teal
  v4Adj: "rgba(255,159,64,1)",     // Orange
  v4Clean: "rgba(153,102,255,1)",  // Purple
  v4Homogen: "rgba(255,206,86,1)", // Yellow
  v4Raw: "rgba(0,200,83,1)"        // Green
};

/**
 * MeanTempChart Component
 *
 * @param {Object} props
 * @param {Record<StationDataVersion, StationData[]>} props.data - Array of data objects
 * @param {String} props.stationName - Name of the station
 * @param {String} prop.population
 * Each object in data should have the following properties:
 *   - YEAR: String or Number representing the year.
 *   - metANN: String or Number representing the mean temperature for that year.
 */
const MeanTempChart = ({ data, stationName, population }) => {
  // Filter out data with metANN values that are not valid (e.g. 999.9)

  data = Object.entries(data).reduce( ( prev, [key, val] ) =>  ({
    ...prev,
    [key] : val.filter(ele => parseFloat(ele.metANN) <120 )
  }) , {})

  const labels = Object.values(data).reduce((prev, cur) => prev.length === 0 ? cur.map(ele => ele.YEAR) : prev, [])
  

  // State for autoScale toggle
  const [autoScale, setAutoScale] = useState(false);

  // Handler for checkbox toggle
  const handleAutoScaleChange = (e) => {
    setAutoScale(e.target.checked);
  };

  // If autoScale is enabled, compute min and max from the data; otherwise, use fixed values.
  /**@type {number []} */
  const numArr = Object.values(data).reduce((  prev, cur) => [...prev, ...cur.map(ele => parseFloat(ele.metANN))],[])
  const yMin = autoScale ? Math.min(numArr) -0.5  : -20;
  const yMax = autoScale ? Math.min(numArr) + 0.5 : 20
  // Optionally, compute a step size when autoscaling (here, simply divide the range by 5)
  const stepSize = autoScale ? (yMax - yMin) / 5 : 5;

  // Prepare data for Chart.js

  const dataSets = Object.entries(data).map(([key, val]) => {
    val = (val.filter(ele => parseFloat(ele.metANN) < 123) ).map(ele => ele.metANN)


    return ( {
      label: key,
      data: val,
      fill: false,
      borderColor:  colorMap[key],
      backgroundColor: colorMap[key].replace("1)", "0.4)"),
      tension: 0.1,
    })
  })

  console.log("dataSts", dataSets);
  

  
  const chartData = {
    labels : labels,
    datasets: [
      ...dataSets,
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
    <div style={{ maxWidth: "800px", width:"85%", margin: "0 auto" }}>
      <div
        className="grid"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div style={{ fontSize: "1rem", fontWeight: "bold", margin:"0.5rem", marginLeft: "0.7rem" }}>
           { `Population ${population}`  /*stationName*/}
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
