"use client"

import { useEffect, useState } from "react"
import MultiRangeSlider from "./multiRangeSlider/multiRangeSlider"
import { useDispatch, useSelector } from "react-redux"
import { setFilterMetadata } from "@/lib/slice/metadataSlice"


import "./filterComponent.css"

export default function FilterComponent() {

    /**
     * @type {import("@/lib/store").Metadata[]}
     */
    const metadata = useSelector(state => state.metadata.metadata)
    let filteredMetadata = metadata.map(ele => ele)

    const dispatch = useDispatch()

    const [minLat, setMinLat] = useState(-181) 
    const [minLng, setMinLng] = useState(-181) 
    const [minPop, setMinPop] = useState(-181) 
    const [minYear, setMinYear] = useState(-181) 


    const [maxLat,  setMaxLat] =  useState(1_810_000_000) 
    const [maxLng,  setMaxLng] =  useState(1_810_000_000) 
    const [maxPop,  setMaxPop] =  useState(1_810_000_000)  
    const [maxYear, setMaxYear] = useState(1_810_000_000) 

    const [stationName, setStationName] = useState("")

    console.log(stationName);
    

    const performFilter = () => {   
        if (stationName !== "") {
            console.log("name serach chain", stationName, filteredMetadata.length);
            
            filteredMetadata = filteredMetadata.filter(ele => ele.stationName.toLocaleLowerCase().includes(stationName.toLocaleLowerCase()))
            console.log("name serach chain", stationName, filteredMetadata.length);

        }
        console.log("start filter chain",filteredMetadata.length);

        filteredMetadata = filteredMetadata.filter(ele => ele.lat<maxLat)
        console.log("begin maxchain",filteredMetadata.length);
        
        filteredMetadata = filteredMetadata.filter(ele => ele.lng<maxLng)     
        console.log("chain",filteredMetadata.length);

        filteredMetadata = filteredMetadata.filter(ele => ele.population<maxPop)
        console.log("chain",filteredMetadata.length);

        filteredMetadata = filteredMetadata.filter(ele => ele.yearTo<=maxYear)
        console.log("end maxchain",filteredMetadata.length);

        
        filteredMetadata = filteredMetadata.filter(ele => ele.lat>minLat)   
        console.log("begin min chain",filteredMetadata.length);

        filteredMetadata = filteredMetadata.filter(ele => ele.lng>minLng)
        console.log("chain",filteredMetadata.length);

        filteredMetadata = filteredMetadata.filter(ele => ele.population>=minPop)
        console.log("chain",filteredMetadata.length);

        filteredMetadata = filteredMetadata.filter(ele => ele.yearFrom>=minYear)
        console.log("end minchain",filteredMetadata.length);

        dispatch(setFilterMetadata(filteredMetadata))
    }

    useEffect(()=> {

        performFilter()
    }, [stationName, minLat, maxLat, minLng, maxLng, minPop, maxPop, minYear, maxYear, metadata, dispatch]);

  


    const setLat = (min, max) => {
        setMinLat(min)
        setMaxLat(max)
    }

    const setLng = (min, max) => {
        setMinLng(min)
        setMaxLng(max)

    }

    const setPop = (min, max) => {
        setMinPop(min)
        setMaxPop(max)

    }

    const setYear = (min, max) => {
        setMinYear(min)
        setMaxYear(max)
    }


    return (
        <div className="filter-panel">
          <h2>Filter Panel</h2>
    
          <div className="filter-group">
            <label>Station Name</label>
            <input
              type="text"
              onChange={(e) => setStationName(e.target.value)}
              className="filter-input"
              placeholder="Enter station name..."
            />
          </div>
    
          <div className="filter-group">
            <label>Latitude</label>
            <MultiRangeSlider min={-90} max={90} onChange={({ min, max }) => setLat(min, max)} />
          </div>
    
          <div className="filter-group">
            <label>Longitude</label>
            <MultiRangeSlider min={-180} max={180} onChange={({ min, max }) => setLng(min, max)} />
          </div>
    
          <div className="filter-group">
            <label>Population</label>
            <MultiRangeSlider min={10000} max={1000000} onChange={({ min, max }) => setPop(min, max)} />
          </div>
    
          <div className="filter-group">
            <label>Year</label>
            <MultiRangeSlider min={1879} max={2024} onChange={({ min, max }) => setYear(min, max)} />
          </div>
        </div>
      );
    }