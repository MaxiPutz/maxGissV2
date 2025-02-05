import axios from "axios";
import {JSDOM} from "jsdom"

/**
 * 
 * @param {Metadata} metadata 
 * @returns 
 */
const tableURL = (metadata) =>`https://data.giss.nasa.gov/cgi-bin/gistemp/stdata_find_v4.cgi?lat=${metadata.lat}&lon=${metadata.lng}&ds=14`

/**
 * @typedef {Metadata & {
* v4Id: string,
* distance: string,
* }} GissV4Metadata
*/




export async function POST (req) {
    /**
     * @type {Metadata}
     */
    const data = await req.json()

    const res = (await axios(tableURL(data))).data

    const metadataList =  (scrapp(res).filter(ele => ele !== null)
    .reduce( (prev, row) => prev.find(ele => ele.id === row[6].trim() ) ? [...prev] : [...prev, ({
        stationName: row[1].trim(),  // Trim whitespace
        lat: parseCoordinate(row[2].trim()),
        lng: parseCoordinate(row[3].trim()),
        id: data.id,
        v4Id: row[4],
        population: data.population,
        yearFrom: (row[6].split("-")[0].trim()),
        yearTo: (row[6].split("-")[1].trim()),
        distance: row[0]
    })
    ], []));
    

    return new Response(JSON.stringify(metadataList))
}


function scrapp (textHtml) {

    const {document} = new JSDOM(textHtml).window;

 
    

    const data = [...document.querySelectorAll("tr")]
    .reduce((prev, cur) => cur.querySelectorAll("td").length ? 
        [...prev, [...cur.querySelectorAll("td")]] : prev
        , [])
    .map(ele => ele.map(ele => ele.textContent.trim()))
    
    return data
}

 
function parseCoordinate(coord) {
    const value = parseFloat(coord); // Extract numeric part
    if (coord.includes("S") || coord.includes("W")) {
        return -value; // South & West should be negative
    }
    return value; // North & East remain positive
}