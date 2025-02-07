/**
 * 
 * @param {string} id 
 * @param {StationDataVersion} version 
 * @returns 
 */

import axios from "axios"
import { version } from "jszip"
import { loadGetInitialProps } from "next/dist/shared/lib/utils"


/**
 * @type {Record<StationDataVersion, number>} 
*/
const stationMap = {
    v4Raw: 5,
    v4Clean: 3, 
    v4Homogen: 4,
    v4Adj: 3
  }
  


const firstUrl = (id, version) => `https://data.giss.nasa.gov/cgi-bin/gistemp/stdata_show_v4.cgi?id=${id}&ds=1${stationMap[version]}&dt=1`
const url = (id, version) => `https://data.giss.nasa.gov/tmp/gistemp/STATIONS_v4/tmp_${id}_1${stationMap[version]}_0_1/station.txt`

export async function POST (req) {

    const data = await req.json()
    
    const res = (await Promise.all([ fetchAndParse(data.id, "v4Adj"), fetchAndParse(data.id, "v4Raw"), fetchAndParse(data.id, "v4Homogen"), fetchAndParse(data.id, "v4Clean")]))
    .reduce((prev, /** @type {Record<StationDataVersion, StationData>} */ cur) => ({
    ...prev,
    ...cur
  }),{})

    
    console.log("response");
    
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

        await new Promise((res) => setTimeout(() => res(), 100));

        const trash = await axios.get(firstUrl(id, version));
        const rawData = (await axios.get(url(id, version))).data.trim();
        const lines = rawData.split("\n").slice(2, rawData.split("\n").length-1)
        
        if (lines.length < 2) {
            throw new Error("Invalid dataset format");
        }


        // Extract column headers
        const headers = lines[0].trim().split(/\s+/); // Splitting by whitespace

        // Ensure "YEAR" is first header
        if (headers[0] !== "YEAR") {
            throw new Error("Column headers missing or malformed");
        }

        // Parse Data Rows
        const records = lines.slice(1) // Skip metadata & headers
            .map(line => {
                const values = line.trim().split(/\s+/); // Extract values from row
                if (values.length !== headers.length) {
                    console.warn(`Skipping row: Incorrect number of values (${values.length}) for headers (${headers.length})`);
                    return null;
                }

                // Create a structured object from headers & values
                const record = {};
                headers.forEach((header, index) => {
                    record[header] = index === 0 ? values[index] : parseFloat(values[index]) || null;
                });

                return record;
            })
            .filter(Boolean); // Remove any `null` entries from malformed rows

        return {
            [version]: records
        };
    } catch (error) {
        console.error("Error fetching or parsing the data:", error);
    }
}