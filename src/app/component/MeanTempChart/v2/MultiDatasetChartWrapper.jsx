// src/components/MultiDatasetChartWrapper.jsx
import React, { useEffect, useState } from "react";
import MultiDatasetChart from "./MultiDatasetChart";

/**
 * 
 * @param {{data : Record<string, StationData> } } param0 
 * @returns 
 */
export default function MultiDatasetChartWrapper({ data }) {

  /**
   * @type {Record<string,StationData> }
   */
  data = Object.entries(data).reduce((prev, [key, val]) => ({
    ...prev,
    [key]: val.filter((ele) => parseFloat(ele.metANN) < 120),
  }), {})

  const datasetKeys = Object.keys(data);


  /**
   * @type {Record<string, Record<string, StationData>>}
  */
  const test = Object.entries(data).reduce((prev, [versionKey, stationDatas]) => ({
    ...prev,
    [returnNameFromData(stationDatas)]: {
      ...prev[returnNameFromData(stationDatas)],
      [versionKey]: stationDatas
    }
  }), {})



  // Maintain state for each dataset’s enabled/disabled status.
  const [enabledDatasets, setEnabledDatasets] = useState(
    datasetKeys.reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {})
  );


  const toggleDataset = (key) => {
    setEnabledDatasets(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Filter data to include only enabled datasets.
  const filteredData = datasetKeys.reduce((acc, key) => {
    if (enabledDatasets[key]) {
      acc[key] = data[key];
    }
    return acc;
  }, {});


  useEffect(() => {
    setEnabledDatasets(prev => {
      // Create a new state object that preserves existing toggles and defaults new ones to true.
      const newState = { ...prev };
      datasetKeys.forEach(key => {
        if (newState[key] === undefined) {
          newState[key] = true;
        }
      });
      return newState;
    });
  }, [datasetKeys]);
  

  return (
    <div style={{
      height: "500px",
    }}>

      <div style={
        {
          width: "95%",
          margin: "0 auto",
          position: "relative",
          marginBottom: "1rem",
          textAlign: "center"
        }}>

        {
          Object.entries(test).map(([stationName, val], i) =>
            <div key={i}>
              {
                stationName === "" ? <></> :
                  <div style={{
                    background: "#adff2f",
                    borderRadius: "6px",
                    padding: "6px"
                  }}>
                    <div>
                      {stationName}
                    </div>

                    <div>

                      {Object.keys(val).map((dataSet, j) =>
                        <label key={dataSet} style={{ marginRight: "1rem" }}>
                          <input
                            type="checkbox"
                            checked={enabledDatasets[dataSet]}
                            onChange={() => toggleDataset(dataSet)}
                          />{" "}
                          {dataSet}
                        </label>
                      )}
                    </div>
                  </div>
              }
            </div>
          )
        }
      </div>
      {/* Chart */}
      <div style={{
      }}>
        <MultiDatasetChart data={filteredData} />
      </div>
    </div>
  );
}

/**
 * 
 * @param {StationData[]} stationData 
 * @returns {string}
 */
function returnNameFromData(stationData) {
  return stationData.reduce((prev, cur) => prev !== "" ? prev : cur.name ? cur.name : "", "")
}