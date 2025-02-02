const url = "https://data.giss.nasa.gov/cgi-bin/gistemp/stdata_find_v2.cgi?d=1&ds=1&name=&world_map.x=1&world_map.y=1"


export const scrapp =  (url) =>

fetch("/api/nasa", {method:"POST", body: JSON.stringify({url: url} )})
.then(ele => ele.json())
.then(ele => ele.doc)
.then (ele => {
    console.log(ele)
    const parser = new DOMParser()
    const doc =  parser.parseFromString(ele, "text/html");

    console.log(doc)

    const data = [...doc.querySelectorAll("tr")]
    .reduce((prev, cur) => cur.querySelectorAll("td").length ? 
        [...prev, [...cur.querySelectorAll("td")]] : prev
        , [])
    .map(ele => ele.map(ele => ele.innerText))

    console.log(data)
    fetch("/api/data", {method:"POST", body: JSON.stringify({data: data})}).then(ele => {
        console.log(ele);
        return ele.json()
    }).then(ele => {
        console.log(ele);
        
    })
})