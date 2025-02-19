"use client"


import { useState } from "react"
import "./collapsComponent.css"
import { useSelector } from "react-redux"
import { GissV4StationSelector } from "../stationPanel/gissv4StationSelector/GissV4StationSelector"

export function CollapsComponent ({children, header, id, key}) {

    const [isChecked, setIsChecked] = useState(false)

    /**
     * @type {Metadata[]}
     */
    const metadatas = useSelector(state => state.metadata.metadata)

    const metadata = metadatas.find(e => e.id === id)
    console.log(metadata, "collaps");
    

    return <>
    <div key={key}>
        <div style={{display: "grid", gridTemplateColumns: "auto auto",}}>

        <label key={key}>
            <div  className="collapsHeader" style={{ fontSize: "1.5rem", fontWeight: "bold", margin:"0.5rem" }} >
            <input className="hide collapsInput" type="checkbox" onChange={()=> setIsChecked(!isChecked)}/>
             {header}  </div>
        </label>
        <GissV4StationSelector gissV2Metadata={metadata}/>  
        </div>
        <div className={`collapsContent ${ isChecked ?  "collapsContentChecked" : ""}`}>
                {children}
        </div>
    
    </div>
    </>
}
