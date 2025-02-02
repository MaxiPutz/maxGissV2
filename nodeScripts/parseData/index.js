import fs from "fs"

const data = JSON.parse(fs.readFileSync("data.json").toString())
.filter(ele => ele !== null)
.reduce( (prev, row) => prev.find(ele => ele.id === row[6].trim() ) ? [...prev] : [...prev, ({
    stationName: row[2].trim(),  // Trim whitespace
    lat: parseCoordinate(row[4].trim()),
    lng: parseCoordinate(row[5].trim()),
    id: row[6].trim(),
    population: Number( row[7].replace("<","").replace(",","") . trim()),
    yearFrom: Number(row[8].split("-")[0].trim()),
    yearTo: Number(row[8].split("-")[1].trim()),
})
], [])
console.log(data,data.length);



function parseCoordinate(coord) {
    const value = parseFloat(coord); // Extract numeric part
    if (coord.includes("S") || coord.includes("W")) {
        return -value; // South & West should be negative
    }
    return value; // North & East remain positive
}

fs.writeFileSync("./tmp/metaData.json", JSON.stringify(data, undefined, 4))