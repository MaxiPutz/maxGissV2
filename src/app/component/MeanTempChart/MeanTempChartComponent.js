"use client";

import React, { useState, useRef, useEffect } from "react";
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
 * Color map for each dataset version.
 * @type {Record<StationDataVersion, string>}
 */
const colorMap = {
  v2Combi: "rgba(54,162,235,1)",   // Blue
  v2Raw: "rgba(255,99,132,1)",      // Red
  v2Homogen: "rgba(75,192,192,1)",   // Teal
  v4Adj: "rgba(255,159,64,1)",       // Orange
  v4Clean: "rgba(153,102,255,1)",    // Purple
  v4Homogen: "rgba(255,206,86,1)",    // Yellow
  v4Raw: "rgba(0,200,83,1)"          // Green
};

/**
 * ExternalLegend Component
 *
 * Renders an external interactive legend using the chart datasets.
 * Clicking a legend item toggles its corresponding dataset.
 *
 * @param {{ datasets: Array, chartRef: React.RefObject }} props
 */
const ExternalLegend = ({ datasets, chartRef }) => {
  // Create an array of booleans (true = visible) for each dataset.
  const [visibility, setVisibility] = useState(datasets.map(() => true));

  const handleLegendChange = (index) => {
    setVisibility((prev) => {
      const newVisibility = [...prev];
      // Toggle the visibility for this dataset.
      newVisibility[index] = !newVisibility[index];
      if (chartRef.current) {
        const chart = chartRef.current;
        // If visible, hidden is false; if not, hidden is true.
        chart.getDatasetMeta(index).hidden = !newVisibility[index];
        chart.update();
      }
      return newVisibility;
    });
  };

  return (
    <>
      <style jsx>{`
        .legend-container {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
          margin: 0;
          padding: 0;
        }
        .legend-label {
          display: flex;
          align-items: center;
          margin: 0 10px 10px 10px;
          padding: 4px 8px;
          border-radius: 4px;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        /* When the dataset is enabled (checkbox checked) */
        .legend-label.checked {
          opacity: 1;
          background-color: transparent;
        }
        /* When the dataset is disabled (checkbox unchecked) */
        .legend-label.unchecked {
          opacity: 0.5;
          background-color: #eee;
        }
        .legend-box {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 5px;
        }
        input[type="checkbox"] {
          display: none;
        }
      `}</style>
      <div className="legend-container">
        {datasets.map((ds, idx) => (
          <label
            key={idx}
            className={`legend-label ${visibility[idx] ? "checked" : "unchecked"}`}
          >
            <input
              type="checkbox"
              checked={visibility[idx]}
              onChange={() => handleLegendChange(idx)}
            />
            <span
              className="legend-box"
              style={{ backgroundColor: ds.borderColor }}
            ></span>
            {ds.label}
          </label>
        ))}
      </div>
    </>
  );
};



/**
 * MeanTempChart Component
 *
 * Renders a line chart with up to 7 datasets.
 * - For large screens (> 1000px): uses built‑in animated legend.
 * - For smaller screens: uses an external interactive legend.
 *
 * Also includes an auto scale toggle and population info rendered outside the chart.
 *
 * @param {Object} props
 * @param {Record<StationDataVersion, StationData[]>} props.data - Data sets.
 * @param {string} props.stationName - Station name.
 * @param {string} props.population - Population info.
 */
const MeanTempChart = ({ data, stationName, population }) => {
  // Filter out invalid metANN values.
  const a = {...data}
  data = Object.entries(data).reduce(
    (prev, [key, val]) => ({
      ...prev,
      [key]: val.filter((ele) => parseFloat(ele.metANN) < 120),
    }),
    {}
  );

  // Assume all datasets have the same YEAR values.
  const labels = Object.values(data).reduce(
    (prev, cur) => (prev.length === 0 ? cur.map((ele) => ele.YEAR) : prev),
    []
  );

  // Auto scale state and toggle handler.
  const [autoScale, setAutoScale] = useState(false);
  const handleAutoScaleChange = (e) => {
    setAutoScale(e.target.checked);
  };

  // Compute y-axis bounds.
  const numArr = Object.values(data).reduce(
    (prev, cur) => [...prev, ...cur.map((ele) => parseFloat(ele.metANN))],
    []
  );
  const yMin = autoScale ? Math.min(...numArr) - 0.5 : -20;
  const yMax = autoScale ? Math.max(...numArr) + 0.5 : 20;
  const stepSize = autoScale ? (yMax - yMin) / 5 : 5;

  // Prepare the datasets.
  const dataSets = Object.entries(data).map(([key, val]) => {
    const filteredVals = val
      .filter((ele) => parseFloat(ele.metANN) < 123)
      .map((ele) => ele.metANN);
    return {
      label: key,
      data: filteredVals,
      fill: false,
      borderColor: colorMap[key],
      backgroundColor: colorMap[key].replace("1)", "0.4)"),
      tension: 0.1,
    };
  });

  const chartData = {
    labels: labels,
    datasets: [...dataSets],
  };

  // Determine if the viewport is large.
  const [isLargeScreen, setIsLargeScreen] = useState(
    typeof window !== "undefined" ? window.innerWidth > 1000 : true
  );
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1000);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Chart ref to access the chart instance.
  const chartRef = useRef(null);

  // Chart options: use built‑in legend for large screens; disable it for small screens.
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: isLargeScreen, // built-in legend only on large screens
        // For built-in legend, toggling datasets will animate automatically.
      },
      title: {
        display: false,
      },
    },
    animation: {
      duration: 500, // Animate updates over 500ms
    },
    scales: {
      y: {
        min: yMin,
        max: yMax,
        ticks: { stepSize: stepSize },
        title: { display: false, text: "Temperature (°C)" },
      },
      x: {
        title: { display: false, text: "Year" },
      },
    },
  };

  return (
    <div
      style={{
        width: "95%",
        margin: "0 auto",
        position: "relative",
        paddingBottom: isLargeScreen ? "50px" : "100px", // extra space if external legend is rendered
      }}
    >
      {/* Chart */}
      <Line ref={chartRef} data={chartData} options={options} />

      {/* Render external interactive legend for small screens */}
      {!isLargeScreen && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <ExternalLegend datasets={dataSets} chartRef={chartRef} />
        </div>
      )}

      {/* Auto Scale Toggle and Population Info */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
          padding: "0 1rem",
        }}
      >
        <div style={{ fontSize: "1rem", fontWeight: "bold" }}>
          {`Population ${population}`}
        </div>
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
            style={{ width: "20px", height: "20px", accentColor: "#4caf50" }}
          />
          Auto Scale
        </label>
      </div>
    </div>
  );
};

export default MeanTempChart;
