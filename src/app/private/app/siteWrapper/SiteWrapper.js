"use client"

import MapBoxComponent from "@/app/component/mapbox/mapBoxComponent";
import styles from "./SiteWrapper.module.css"
import FilterComponent from "@/app/component/filter/filterComponent";
import {FilterIcon, Minimize2, Maximize2} from "lucide-react"
import { useState } from "react";
import { useAppSelector } from "@/app/lib/hooks";
import StationComponent from "@/app/component/stationPanel/station/stationComponent";
import { MeantempPanelComponent } from "@/app/component/MeanTempChart/MeanTempPanelComponent";
import { MeanTempMobile } from "@/app/component/MeanTempChart/mobile/MeanTempMobile";

export function SiteWrapper() {
    const [isChecked, setChecked] = useState(false)
    const [isMinimizeChecked, setMinimzeChecked] = useState(false)

    const [chartIndex, setChartIndex] = useState(-1)

    const [isActive, setIsActive] = useState(false)

    /**
     *  @type {Metadata[]} 
     */
    const metadata = useAppSelector(state => state.metadata.filteredMetadata)
    const bearer = useAppSelector(state => state.bearer)
    return (
        <div className={styles.siteWrapper}>
        <div className={styles.header}>
            <header className="header">
                <h1>NASA GISS Temperature Data</h1>
                <p>Visualizing global temperature changes using NASA's GISS dataset.</p>
            </header>
        </div>
        {
            /* filter  */
        }
            <div className={`${styles.filter}  ${isActive ? styles.inActiveContent : styles.activeFilterContent}`}>
                <label className={styles.label}>
                    <FilterIcon className={styles.filterIcon}/>
                    <input className={styles.filterCheckbox} checked={isChecked} onChange={()=> setChecked(!isChecked)} type="checkbox" style={{display: "none"}}/>
                </label>
                <label  className={styles.label}>
                    {
                        isMinimizeChecked ? <Maximize2  className={styles.sizeIcon}/> :   <Minimize2  className={styles.sizeIcon}/>
                    }
                    <input type="checkbox" className={styles.mapCheckbox} checked={isMinimizeChecked} onChange={()=> setMinimzeChecked(!isMinimizeChecked)} style={{display:"none"}}/>
                </label>

                    <div className={`${styles.filterMap} ${isChecked ? styles.filterMapChecked : styles.filterMapUnChecked}`}>
                        <FilterComponent/>
                    </div>

                    <div className={`${styles.map} ${isMinimizeChecked? styles.mapUnChecked : styles.mapChecked}`} >
                        <MapBoxComponent/>            
                    </div>
            </div>
            {
            /* list  */
            }
            <div className={`${styles.list}  ${isActive ? styles.inActiveContent : styles.activeContent}`}>
                <div className={`${styles.listCarousel} ${isMinimizeChecked ? styles.overMap : "" }`}>
                    {metadata.slice(0,50).map((ele,i) => <div onClick={() => {
                        console.log("chartindex", i);
                        
                        setChartIndex(i)
                        setIsActive(true)
                    }
                    } key={i}> <StationComponent key={i} station={ele} bearer={bearer} isMobile={window.innerWidth < 1000}/>   </div>)} 
                </div>
            </div>
            <div className={`${styles.content} ${isActive ? styles.activeContent : styles.inActiveContent}`}>
                {
                    window.innerWidth < 1000 ? 
                    ( 
                     <MeanTempMobile  initChartIndex={chartIndex} isActive={isActive} setIsActive={setIsActive}/> 
                    ) 
                     : <MeantempPanelComponent/>
                }
            </div>
        </div>
    );
}