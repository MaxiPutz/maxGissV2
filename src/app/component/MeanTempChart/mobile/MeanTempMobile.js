"use client"
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBigDown, ArrowBigUp, ArrowLeft } from "lucide-react";
import styles from "./MeanTempMobile.module.css";
import { setMeanTemp } from "@/app/lib/slice/meanTempSlicer";
import { CollapsComponent } from "../../collapsComponent/collapsComponent";
import MeanTempChart from "../MeanTempChartComponent";
import { useSectionHook } from "@/app/lib/hook/useSectionHook";
import { GissV4StationSelector } from "../../stationPanel/gissv4StationSelector/GissV4StationSelector";
import SkyBackground from "../../background/Background";
import Loading from "react-loading";

/**
 * Mobile view that translates vertically between sections.
 * @param {{initChartIndex?: number, isActive: boolean, setIsActive: Function(boolean)}} props
 */
export function MeanTempMobile({ initChartIndex = 0, isActive, setIsActive }) {
    const [chartIndex, setChartIndex] = useState(initChartIndex);
    /**
     * @type {Metadata[]}
     */
    const filteredMetadata = useSelector((state) => state.metadata.filteredMetadata);

    const ref = useRef(null)

    useEffect(()=> {
        setChartIndex(initChartIndex)
    }, [initChartIndex])


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
        <div className={`${styles.mobilePage} ${isActive ? styles.active : styles.notActive}`} >
            <div  className={styles.mobileContainer} >
                <div className={`${styles.arrowButton} ${styles.upButton}`} onClick={()=> setIsActive(false)} style={{position: "absolute", top:"24px", left:"24px", backgroundColor: "white", borderRadius: "40px", padding:"6px", border: "solid"}}>
                <ArrowLeft/>
                </div>
                {
                    chartIndex !== 0 ?
                        <button className={`${styles.arrowButton} ${styles.upButton}`} onClick={handleUp}>
                            <ArrowBigUp size={24} /> </button>
                        : <></>
                }

                <div
                    ref={ref}
                    className={styles.sectionsContainer}
                   
                >
                    {filteredMetadata.slice(0,50). map((ele, i) => (
                        <div
                        style={{  transform: `translateY(-${chartIndex * 100}vh)` }}
                        key={i} className={styles.section}>

                            <MobileChart station={ele} isActive={isActive} observerRoot={ref}/>
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
        </div>
    );
}

/**
 * 
 * @param {{station: Metadata, observerRoot: import("react").RefObject, isActive: boolean}} param0 
 * @returns 
 */
function MobileChart({ station, observerRoot, isActive }) {
    const id = station.id.toString()

    let timer = undefined



    const tmpData = useSelector(s => s.meanTemp[id])
    const tmpData2 = useSelector(s => s.meanTemp)
    const bearer = useSelector(s => s.bearer)
    const [isLoading, setIsLoading] = useState(false)
    const ref = useRef(null)
    const dispatch = useDispatch()


    

    const handleData = ()=> {

        
        if (isLoading) return
        
        if (tmpData) return
        if (!isActive) return

        clearTimeout(timer )
        timer = setTimeout(()=> {
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
                
                setIsLoading(false)
                dispatch(setMeanTemp({ id: id, data: ele.data }))
            })
            setIsLoading(true)
        }, 300)
    }


    const [wWidth, setWWidth] = useState(0)

    
    useEffect(() => {
        const handleResize = () => {
            setWWidth(window.innerWidth);
        };
        handleResize()
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    


    const hook = useSectionHook({
        ref: ref,
        observerRoot: observerRoot,
        callback: () =>  {
            
            handleData()
        },
        rootMargin: `${wWidth}px`,
        threshold: 0.1,
        observerName: station.stationName
    })


    return <div ref={ref} style={{position: "relative", height: "100%", width: "100%", display: "grid",justifyItems: "stretch",alignItems: "center"}}>
        <SkyBackground>

    {
        !tmpData ? <>
        <div style={{
            display: "grid",
            justifyItems: "center",
            width:" 100%",
            height: "100%",
            position: "absolute",
            top: "0px",
            left:" 0px",
            transform: "translate(0, 25%)",
        }} >
            <Loader/>
            <div style={{
                transform: "translateY(-50%)"
            }}>
                loading {station.stationName}
            </div>
        </div> 
        </>
        :
        <div >
               <GissV4StationSelector gissV2Metadata={station} flyInByRender={true}/>  
               {
                   /**
                    <CollapsComponent header={station.stationName} id={id}>
                    <MeanTempChart data={tmpData} stationName={station.id} /> 
                    </CollapsComponent>
                    */
                }
        </div>
    }
    </SkyBackground>
    </div>
}


function Loader() {
    return (
      <>
        <style jsx>{`
          .loader {
            width: 100px;
            height: 100px;
            background-color: orange;
            border-radius: 50%;
            box-shadow: -15px -15px 15px #ff6600,
              15px -15px 15px #ff9100,
              15px 15px 15px #ff5500,
              -15px 15px 15px #ffa600,
              -15px 0 15px #ff6600,
              15px 0 15px #ffcc00;
            animation: rotate 1s infinite;
            transform: rotate(0) scale(0.8);
          }
  
          @keyframes rotate {
            0% {
              transform: rotate(360deg) scale(0.8);
            }
            50% {
              transform: rotate(0) scale(1.2);
            }
            100% {
              transform: rotate(360deg) scale(0.8);
            }
          }
        `}</style>
        <div className="loader"></div>
      </>
    );
  }
  