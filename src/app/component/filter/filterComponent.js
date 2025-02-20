"use client"

import { useEffect, useState } from "react"
import MultiRangeSlider from "./multiRangeSlider/multiRangeSlider"
import { useDispatch, useSelector } from "react-redux"
import { setFilterMetadata } from "@/app/lib/slice/metadataSlice"


import "./filterComponent.css"
import ExponentialMultiRangeSlider from "./multiRangeSlider/multiRangeSliderExp"
import { LogIn } from "lucide-react"



export default function FilterComponent() {

    const [isYearfilterActive, setIsYearfilterActive ]= useState(true)


    /**
     * @type {import("@/app/lib/store").Metadata[]}
     */
    const metadata = useSelector(state => state.metadata.metadata)

    console.log(metadata.filter(ele => ele.id === "603110350003"), "wien" );
    

    let filteredMetadata = metadata.map(ele => ele)

    /**
     * @type {ViewPointType}
     */
    const viewPoint = useSelector((state) => state.viewPoint.viewPoint)


    const dispatch = useDispatch()

    const [minLat, setMinLat] = useState(viewPoint.minLat) 
    const [minLng, setMinLng] = useState(-180) 
    const [minPop, setMinPop] = useState(9_999) 
    const [minYear, setMinYear] = useState(1_879) 


    const [maxLat,  setMaxLat] =  useState(90) 
    const [maxLng,  setMaxLng] =  useState(180) 
    const [maxPop,  setMaxPop] =  useState(1_810_000_000)  
    const [maxYear, setMaxYear] = useState(1_810_000_000) 

    const [stationName, setStationName] = useState("")

    console.log(stationName);
    

    const performFilter = () => {   
        if (stationName !== "") {
            
            filteredMetadata = filteredMetadata.filter(ele => ele.stationName.toLocaleLowerCase().includes(stationName.toLocaleLowerCase()))

        }
        filteredMetadata = filteredMetadata.filter(ele => ele.lat<maxLat)
        
        filteredMetadata = filteredMetadata.filter(ele => ele.lng<maxLng)     

        filteredMetadata = filteredMetadata.filter(ele => ele.population<maxPop)

        if (isYearfilterActive)
        filteredMetadata = filteredMetadata.filter(ele => (ele.yearTo>=maxYear)) /// < here 

        
        filteredMetadata = filteredMetadata.filter(ele => ele.lat>minLat)   

        filteredMetadata = filteredMetadata.filter(ele => ele.lng>minLng)

        filteredMetadata = filteredMetadata.filter(ele => ele.population>=minPop)
        console.log("chain",filteredMetadata.length);

        if (isYearfilterActive)
        filteredMetadata = filteredMetadata.filter(ele => (ele.yearFrom<=minYear)) // < here 
        console.log("end minchain",filteredMetadata.length);

        console.log(minLat, maxLat, "chain");
        
        dispatch(setFilterMetadata(filteredMetadata))
    }

    useEffect(()=> {

        performFilter()
    }, [isYearfilterActive, stationName, minLat, maxLat, minLng, maxLng, minPop, maxPop, minYear, maxYear, metadata ,dispatch]);



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
            <MultiRangeSlider min={viewPoint.minLat.toFixed(2)} max={viewPoint.maxLat.toFixed(2)} setMax={90} setMin={-90}  onChange={({ min, max }) => setLat(min, max)} />
          </div>
    
          <div className="filter-group">
            <label>Longitude</label>
            <MultiRangeSlider min={viewPoint.minLng.toFixed(2)} max={viewPoint.maxLng.toFixed(2)} onChange={({ min, max }) => setLng(min, max)} />
          </div>
    
          <div className="filter-group">
            <label>Population</label>
       
            <ExponentialMultiRangeSlider min={10000} max={100_000_000} onChange={({ min, max }) => setPop(min, max)} />
          </div>
    
          <div className="filter-group">
            <label>Year <input type="checkbox" checked={isYearfilterActive} onChange={(e)=> {
              setIsYearfilterActive(!isYearfilterActive)} 
              }/> (active) </label>
            <MultiRangeSlider min={1880} max={2010} setMin={1881} setMax={2011}  onChange={({ min, max }) => setYear(min, max)} />
          </div>
        </div>
      );
    }