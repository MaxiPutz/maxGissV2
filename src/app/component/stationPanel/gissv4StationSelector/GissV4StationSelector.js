

import { useDispatch, useSelector } from "react-redux"
import StationComponent from "../station/stationComponent"
import "./GissV4StationSelector.css"
import { useState } from "react"
import MeanTempChart from "../../MeanTempChart/MeanTempChartComponent"
import { setMeanTemp } from "@/app/lib/slice/meanTempSlicer"
import {ScanIcon, Search} from "lucide-react"
import { StationRadioCard } from "./radio/StationRadioCard"

/**
 * @typedef {Object} GissV4StationSelectorProps
 * @property {Metadata} gissV2Metadata
 * 
 */

/**
 * 
 * @param {GissV4StationSelectorProps} props 
 * @returns 
 */
export function GissV4StationSelector({gissV2Metadata}) {

    const dispatch = useDispatch()
    

    const token = useSelector((state) => state.bearer)

    const stationData = useSelector(state => state.meanTemp[gissV2Metadata.id])
    console.log("station data", stationData);
    
    /**
     * @type {[GissV4Metadata[], function (GissV4Metadata[]) ]}
     */
    const [stations4V, setStationsV4] = useState([])

    const [isChecked, setChecked] = useState(false)

    return<>

    <label >
        <div style={{display: "flex",  justifyContent: "flex-end"}}>
            <Search style={{marginRight: "1.1rem",borderRadius: "0.5rem", padding: "0.5rem", background : "black", color: "white"}}/>
        </div>

        <input  onChange={ (e) => {
            const isChecked = e.target.checked
            if(isChecked) {
                if(!stationData) {
                    fetch("/api/private/nasa", {
                        method: "POST",
                        body: JSON.stringify({
                            id : gissV2Metadata.id
                        }),
                        headers: {
                            "Authentication": `Bearer ${token}`
                        }
                    }).then (ele => ele.json())
                    .then(ele => {
                        console.log(ele);
                        dispatch(setMeanTemp({id: gissV2Metadata.id, data: ele.data}))
                    })
                }

                fetch("/api/private/nasa/v4Stations", {
                    headers: {
                         Authorization: `Bearer ${token}`
                    },
                    method: "POST",
                    body: JSON.stringify(gissV2Metadata),
                }).then(ele => ele.json())
                .then(ele => {
                    console.log("success", ele);
                    setStationsV4(ele)
                })
            }
            
        }} className="hide gissSelector" type="checkbox"/>
        <div className="gissSelectorPage">
            <div className={`station-card`} onClick={()=> {
            }}>
                <div className="toleft">X</div>
                <h3>{gissV2Metadata.stationName}</h3>
                <p><strong>Latitude:</strong> {gissV2Metadata.lat}</p>
                <p><strong>Longitude:</strong> {gissV2Metadata.lng}</p>
                <p><strong>Population:</strong> {gissV2Metadata.population}</p>
                <p><strong>Active From:</strong> {gissV2Metadata.yearFrom} - {gissV2Metadata.yearTo}</p>
            </div>
            <div>
                <label className="stationTableContainer">
                {
                    
                        <StationRadioCard 
                        dispatch={dispatch} 
                        gissV2Metadata={gissV2Metadata}
                        token={token}
                        stations4V={stations4V}
                        />
                }

                { 
                stationData !== undefined ? <label>
                    <input onChange={()=> undefined} type="checknox" className="hide"/>
                        <MeanTempChart population={gissV2Metadata.population} data={stationData} stationName={gissV2Metadata.stationName}></MeanTempChart>
                 </label>
                :
                <></>
                }
                 </label>
            </div>
        </div>
    </label>

    </>
}


function Loading () {
    return <>
    Loading </>
}