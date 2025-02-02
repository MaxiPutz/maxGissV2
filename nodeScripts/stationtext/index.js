import  axios  from 'axios';
import fs from "fs";

const url = 'https://data.giss.nasa.gov/tmp/gistemp/STATIONS_v2/tmp_700898680009_1_0/station.txt';

async function fetchAndParse() {
  try {
    // Fetch the text data from the URL
    const response = await axios.get(url);
    const textData = response.data;

    // Parse the text data into an array of lines
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
        return record;
      });

    // Write the result as JSON to a file (station.json)
    fs.writeFileSync('station.json', JSON.stringify(result, null, 2), 'utf-8');
    console.log('Parsed data saved to station.json');
  } catch (error) {
    console.error('Error fetching or parsing the data:', error);
  }
}

fetchAndParse();
