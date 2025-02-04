"use client"


import "./collapsComponent.css"

export function CollapsComponent ({children, header}) {


    console.log("header", header);
    

    return <>
        <label>
            <div  className="collapsHeader" style={{ fontSize: "1.5rem", fontWeight: "bold", margin:"0.5rem" }} >
             {header}  </div>
            <input className="hide collapsInput" type="checkbox"/>
            <div className="collapsContent">
                {children}
            </div>

        </label>
    
    </>
}
