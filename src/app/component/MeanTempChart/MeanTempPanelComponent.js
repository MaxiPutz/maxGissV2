"use client"

import { useSelector } from "react-redux"
import MeanTempChart from "./MeanTempChartComponent"


import "./MeanTemp.css"
import { CollapsComponent } from "../collapsComponent/collapsComponent"

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
                {Object.entries(meanTempObj).map(([id, val],i) => { 
                    const md = metadata.find(ele => ele.id ===id)
                    const name = md.stationName
                    const population = md.population
                    return <div key={i}>
                <CollapsComponent   header={name}  >
                    <MeanTempChart key={id} data={val}stationName={name} population={population}></MeanTempChart>
                </CollapsComponent>
                </div> 
                }
                )}
            </div>
        </div> 
        </>:
        <>
        </>
        }
    </>
    
}