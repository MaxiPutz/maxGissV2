"use client"

import { useSelector } from "react-redux"
import MeanTempChart from "./MeanTempChartComponent"


import "./MeanTemp.css"

export function MeantempPanelComponent() {
    const meanTempObj = useSelector(state => state.meanTemp )
    /**
     * @type {import("@/app/lib/store").Metadata[]} 
     */
    const metadata = useSelector(state => state.metadata.metadata)

    
    const obj = Object.entries(meanTempObj).reduce((prev, [key, val]) => ({
        ...prev,
        [metadata.find(ele => ele.id === key).stationName] : val
        
    }), {})

    console.log("panel", obj);
    

    return <>
    { Object.keys(meanTempObj).length !== 0 ? <>
        <div  className="mean-temp-panel">
            <h2>Mean Temperature</h2>
            <div className="charts-container">
                {Object.entries(obj).map(([name, val],i) => <MeanTempChart data={val} key={i} stationName={name}></MeanTempChart>)}
            </div>
        </div> 
        </>:
        <>
        </>
        }
    </>
    
}