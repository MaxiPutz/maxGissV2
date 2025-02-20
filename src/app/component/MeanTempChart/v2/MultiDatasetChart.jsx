import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";

// Register necessary components and the annotation plugin
ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  annotationPlugin
);

const safeNumber = (val) => (isNaN(Number(val)) ? 0 : Number(val));

const MultiDatasetChart = ({ data }) => {
  if (!data) {
    return null;
  }

  // Get dataset keys (e.g. "gisv2", "gisv3", etc.)
  const datasetKeys = Object.keys(data);

  // Transform each dataset into an array of { x, y } objects
  const transformedData = datasetKeys.reduce((acc, key) => {
    acc[key] = data[key].map((d) => ({
      x: safeNumber(d.YEAR),
      y: safeNumber(d.metANN),
    }));
    return acc;
  }, {});

  // Calculate overall y-axis min and max values
  let allYValues = [];
  Object.values(transformedData).forEach((arr) => {
    arr.forEach((pt) => allYValues.push(pt.y));
  });
  const minY = Math.min(...allYValues);
  const maxY = Math.max(...allYValues);

  // Define colors and point styles for each dataset
  const colors = ["#4dc9f6", "#f67019", "#f53794", "#537bc4", "#acc236"];
  // Chart.js supports several point styles: "circle", "rectRot" (for a diamond-like look), "cross", "rect", "triangle"
  const pointStyles = ["circle", "rectRot", "cross", "rect", "triangle"];

  // Create a dataset for each key
  const chartDatasets = datasetKeys.map((key, i) => ({
    label: key,
    data: transformedData[key],
    borderColor: colors[i % colors.length],
    backgroundColor: colors[i % colors.length],
    pointStyle: pointStyles[i % pointStyles.length],
    fill: false,
    tension: 0, // straight lines
    pointRadius: 3,
    pointHoverRadius: 4,
  }));

  const chartData = {
    datasets: chartDatasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 50,
        bottom: 100,
      },
    },
    plugins: {
      legend: {
        position: "bottom", // Moved legend to bottom
        labels: {
          font: {
            size: 8,
          },
        },
      },
      title: {
        display: true,
        text: "Temperture",
        font: {
          size: 10,
        },
      },
      // Add an annotation: a horizontal line at y = 270
      annotation: {
        annotations: {
          horizontalLine: {
            type: "line",
            yMin: 270,
            yMax: 270,
            borderColor: "#d9d9d9",
            borderWidth: 1,
          },
        },
      },
    },
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        ticks: {
          font: {
            size: 8,
          },
        },
      },
      y: {
        min: minY,
        max: maxY,
        ticks: {
          font: {
            size: 8,
          },
        },
        title: {
          display: true,
          text: "Temperature",
          font: {
            size: 8,
          },
        },
        grid: {
          color: "#d9d9d9",
          lineWidth: 0.5,
        },
      },
    },
  };

  return (
    <div style={{ position: "relative", width: "95%", height: "500px", maxHeight: "200vh", display: "grid"}}>
      <Line data={chartData} options={options} />
      <div style={{ textAlign: "center", fontSize: "8px", marginTop: "4px" }}>
      </div>
    </div>
  );
};

export default MultiDatasetChart;
