const {JSDOM} = require("jsdom")
const url = "https://data.giss.nasa.gov/cgi-bin/gistemp/stdata_find_v2.cgi?d=1&ds=1&name=&world_map.x=1&world_map.y=1"


const scrapp =  (textHtml) => {

    const {document} = new JSDOM(textHtml).window;

 
    

    const data = [...document.querySelectorAll("tr")]
    .reduce((prev, cur) => cur.querySelectorAll("td").length ? 
        [...prev, [...cur.querySelectorAll("td")]] : prev
        , [])
    .map(ele => ele.map(ele => ele.textContent.trim()))
    
    return data
}

 
module.exports = scrapp