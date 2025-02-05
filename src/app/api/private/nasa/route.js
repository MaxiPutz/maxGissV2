"use strict"

import axios from "axios";

/**
 * @typedef {"v2Raw" | "v2Combi" | "v2Homogen" | "v4Raw" | "v4Adj" | "v4Clean" | "v4Homogen" } StationDataVersion
 */

/**
 * @type {Record<StationDataVersion, number>} 
*/
const stationMap = {
  v2Raw:0,
  v2Combi:1,
  v2Homogen: 2, 
}

/**
 * 
 * @param {string} id 
 * @param {StationDataVersion} version
 * @returns 
 */
const firstUrl = (id, version) => `https://data.giss.nasa.gov/cgi-bin/gistemp/stdata_show_v2.cgi?id=${id}&dt=1&ds=${stationMap[version]}`
const url = (id, version) => `https://data.giss.nasa.gov/tmp/gistemp/STATIONS_v2/tmp_${id}_${stationMap[version]}_0/station.txt`

/**
 * for giss v2 raw after comninig source 
const firstUrl = (id) => `https://data.giss.nasa.gov/cgi-bin/gistemp/stdata_show_v2.cgi?id=${id}&dt=1&ds=1`
const url = (id) => `https://data.giss.nasa.gov/tmp/gistemp/STATIONS_v2/tmp_${id}_1_0/station.txt`
*/

/**
 * for giss v2 raw after comninig cleaning/homogeneity 
const firstUrl = (id) => `https://data.giss.nasa.gov/cgi-bin/gistemp/stdata_show_v2.cgi?id=${id}&dt=1&ds=2`
const url = (id) => `https://data.giss.nasa.gov/tmp/gistemp/STATIONS_v2/tmp_${id}_2_0/station.txt`
*/

export async function POST (req) {
    const data = await req.json()

    console.log(data);


    const res = (await Promise.all([ fetchAndParse(data.id, "v2Combi"),   fetchAndParse(data.id, "v2Raw"),  fetchAndParse(data.id, "v2Homogen")]))
    .reduce((prev, /** @type {Record<StationDataVersion, StationData>} */ cur) => ({
    ...prev,
    ...cur
  }),{})

    console.log(Object.keys(res));
    

    return new Response( JSON.stringify( {data: res}))
}


/**
 * @param {String} id 
 * @param {StationDataVersion} version
 * @returns {Promise< Record<StationDataVersion, StationData>>}
 */

async function fetchAndParse(id, version) {
    try {
      console.log(version);
      
      console.log(firstUrl(id, version));
      console.log(url(id, version));
      
      await new Promise((res) => setTimeout(()=> res(), 100))

      const trash = await axios.get(firstUrl(id, version))

      const response = await axios.get(url(id, version));
      const textData = response.data;
  
      const lines = textData.trim().split('\n');
  
      if (lines.length < 2) {
        console.error('Not enough data to parse');
        return;
      }
  
      // The first line is the header.
      // Use a regular expression to split by one or more whitespace characters.
      const headers = lines[0].trim().split(/\s+/);
      // Example headers:
      // ["YEAR", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC", "D-J-F", "M-A-M", "J-J-A", "S-O-N", "metANN"]
  
      // Process each subsequent line to create an object for that row.
      const result = lines.slice(1)
        .filter(line => line.trim() !== '') // skip empty lines
        .map(line => {
          const values = line.trim().split(/\s+/);
          const record = {};
  
          // Map each header to the corresponding value.
          headers.forEach((header, index) => {
            record[header] = values[index];
          });
          return record ;
        });

      return { 
        [version] : result 
      }
      console.log('Parsed data saved to station.json');
    } catch (error) {
      console.error('Error fetching or parsing the data:', error);
    }
  }