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
    /**
     *  @type {Metadata[]} 
     */
    const metadata = useAppSelector(state => state.metadata.filteredMetadata)
    const bearer = useAppSelector(state => state.bearer)
    return (
        <div className={styles.siteWrapper}>


            <div className={styles.filter}>
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
            <div className={styles.list}>
                <div className={styles.listCarousel}>
                    {metadata.slice(0,50).map((ele,i) => <div onClick={() => console.log("clicki cklick ")} key={i}> <StationComponent key={i} station={ele} bearer={bearer}/>   </div>)} 
                </div>
            </div>
            <div className={styles.content}>
                {
                    /*window.innerWidth < 1000 */ true ? <MeanTempMobile /> : <MeantempPanelComponent/>
                }
            </div>
        </div>
    );
}