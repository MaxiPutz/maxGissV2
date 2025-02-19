import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import styles from "./MeanTempMobile.module.css";
import { setMeanTemp } from "@/app/lib/slice/meanTempSlicer";
import { CollapsComponent } from "../../collapsComponent/collapsComponent";
import MeanTempChart from "../MeanTempChartComponent";

/**
 * Mobile view that translates vertically between sections.
 * @param {{initChartIndex?: number}} props
 */
export function MeanTempMobile({ initChartIndex = 0 }) {
    // Use chartIndex to determine which section to show.
    const [chartIndex, setChartIndex] = useState(initChartIndex);
    /**
     * @type {Metadata[]}
     */
    const filteredMetadata = useSelector((state) => state.metadata.filteredMetadata);

    const handleUp = () => {
        if (chartIndex > 0) {
            setChartIndex(chartIndex - 1);
        }
    };

    const handleDown = () => {
        if (chartIndex < filteredMetadata.length - 1) {
            setChartIndex(chartIndex + 1);
        } else {
            setChartIndex(0)
        }
    };

    
    return (
        <div className={styles.mobileContainer}>
            {
                chartIndex !== 0 ?
                    <button className={`${styles.arrowButton} ${styles.upButton}`} onClick={handleUp}>
                        <ArrowBigUp size={24} /> </button>
                    : <></>
            }

            <div
                className={styles.sectionsContainer}
                style={{ transform: `translateY(-${chartIndex * 100}vh)` }}
            >
                {filteredMetadata.slice(0,1). map((ele, i) => (
                    <div key={i} className={styles.section}>

                        <MobileChart station={ele} />
                    </div>
                ))}
            </div>

            {
                chartIndex !== (filteredMetadata.length - 1) ?
                    <button className={`${styles.arrowButton} ${styles.downButton}`} onClick={handleDown}>
                        <ArrowBigDown size={24} />
                    </button> : <></>
            }
        </div>
    );
}

/**
 * 
 * @param {{station: Metadata}} param0 
 * @returns 
 */
function MobileChart({ station }) {
    const id = station.id.toString()

    const tmpData = useSelector(s => s.meanTemp[id])
    const tmpData2 = useSelector(s => s.meanTemp)
    const bearer = useSelector(s => s.bearer)
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()


    console.log(tmpData2[id], "data tmp2");

    console.log(id, "data id");
    console.log(tmpData, "dataFuture");
    


    useEffect(() => {
        if (tmpData) {
            return
        }
        fetch("/api/private/nasa", {
            method: "POST",
            body: JSON.stringify({
                id: id
            }),
            headers: {
                "Authentication": `Bearer ${bearer}`
            }
        }).then(ele => ele.json())
            .then(ele => {
                console.log(ele, "server response");
                console.log(id, "data id");
                
                dispatch(setMeanTemp({ id: id, data: ele.data }))
            })

    },  [id, bearer, dispatch])

    return <>
    {
        !tmpData ? 
        <div>
            loading
        </div> :
        <div style={{position: "relative", height: "80%", width: "85%", display: "grid",justifyItems: "stretch",alignItems: "center"}}>
        <CollapsComponent header={station.stationName} id={id}>
            <MeanTempChart data={tmpData} stationName={station.id} /> 
        </CollapsComponent>
        </div>
    }
    </>
}