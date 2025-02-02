"use client"

import { useDispatch, useSelector } from "react-redux";
import "./stationComponent.css"
import { setMeanTemp } from "@/app/lib/slice/meanTempSlicer";
import { useState } from "react";
import MeanTempChart from "../../MeanTempChart/MeanTempChartComponent";

/**
 * @typedef {Object} station
 * @property {import("@/app/lib/store").Metadata} station
 */


/**
 * 
 * @param {station}  
 * @returns 
 */
export default function StationComponent ( {station, bearer}) {

    const [isLoading, setIsLoading] = useState(false)


    const dispatch = useDispatch()
    
    const data = useSelector(state => state.meanTemp[station.id])


    return <>
    <div>
        <label className={ `${isLoading ? "disable" : ""} ${data? "data": ""}` }>
            <input type="checkbox" className="hide" onChange={() => {
                setIsLoading(true)
                fetch("/api/private/nasa", {
                    method: "POST",
                    body: JSON.stringify({
                        id : station.id
                    }),
                    headers: {
                        "Authentication": `Bearer ${bearer}`
                    }
                }).then (ele => ele.json())
                .then(ele => {
                    console.log(ele);
                    dispatch(setMeanTemp({id: station.id, data: ele.data}))
                    setIsLoading(false)
                })

            }} ></input>


        <div className={`${data ? "data" : ""} station-card`}>
            <h3>{station.stationName}</h3>
            <p><strong>Latitude:</strong> {station.lat}</p>
            <p><strong>Longitude:</strong> {station.lng}</p>
            <p><strong>Population:</strong> {station.population}</p>
            <p><strong>Active From:</strong> {station.yearFrom} - {station.yearTo}</p>
        </div>
        </label>

    </div>
    </>
}