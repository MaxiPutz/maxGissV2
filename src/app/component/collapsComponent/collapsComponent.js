"use client"


import { useState } from "react"
import "./collapsComponent.css"

export function CollapsComponent ({children, header, key}) {

    const [isChecked, setIsChecked] = useState(false)

    return <>
    <div key={key}>

        <label key={key}>
            <div  className="collapsHeader" style={{ fontSize: "1.5rem", fontWeight: "bold", margin:"0.5rem" }} >
            <input className="hide collapsInput" type="checkbox" onChange={()=> setIsChecked(!isChecked)}/>
             {header}  </div>
        </label>
        <div className={`collapsContent ${ isChecked ?  "collapsContentChecked" : ""}`}>
                {children}
        </div>
    
    </div>
    </>
}
