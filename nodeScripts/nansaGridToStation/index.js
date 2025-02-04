/**
 * Execute them in the Developertools on the webside https://data.giss.nasa.gov/ 
 * because of cors
 */

const axios = require('axios');
const fs = require("fs")
const scrapp = require("./scapping/scrapper.js")

let arr = []

for (let x = 1; x< 720; x += 10 ) {
  for (let y = 1;y<430; y+= 10) {
      const url = `https://data.giss.nasa.gov/cgi-bin/gistemp/stdata_find_v2.cgi?d=1&ds=1&name=&world_map.x=${x}&world_map.y=${y}`
      arr.push(url)
  }
}

console.log(arr);
let output = [];
(async()=>{
  for(let i = 0; i<arr.length; i++) {
      const element =  (await  axios.get(arr[i])).data

  
      const outEle = scrapp(element)
      

      output.push(...outEle)

  

      console.log(i, arr.length);
      console.log(output.length, "out");   
  }
  
  fs.writeFileSync("./tmp/gridDatav3.json", JSON.stringify(output))

})() 