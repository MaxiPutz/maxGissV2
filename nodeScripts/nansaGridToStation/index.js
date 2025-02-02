/**
 * Execute them in the Developertools on the webside https://data.giss.nasa.gov/ 
 * because of cors
 */




const arr = []

for (let x = 1; x< 720; x += 35 ) {
  for (let y = 1;y<430; y+=24) {
      const url = `https://data.giss.nasa.gov/cgi-bin/gistemp/stdata_find_v2.cgi?d=1&ds=1&name=&world_map.x=${x}&world_map.y=${y}`
      arr.push(url)
  }
}

console.log(arr);

(async()=>{
  for(let i = 0; i<arr.length; i++) {
    const element = arr[i]
    //await scrapp(element)
    console.log(i, arr.length);
    
  }
})() 