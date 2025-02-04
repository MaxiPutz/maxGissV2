"use client"

import { setFilterMetadata, setMetadata } from "@/app/lib/slice/metadataSlice"
import { useAppDispatch } from "../../lib/hooks"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { setBearer } from "@/app/lib/slice/bearer"
import MapBoxComponent from "@/app/component/mapbox/mapBoxComponent"
import { setEnv } from "@/app/lib/slice/envSlicer"

import "./app.css"
import FilterComponent from "@/app/component/filter/filterComponent"
import StationPanelComponent from "@/app/component/stationPanel/stationpanelComponent"
import { MeantempPanelComponent } from "@/app/component/MeanTempChart/MeanTempPanelComponent"
import JSZip from "jszip"

export default function App() {

        const dispatch = useDispatch()
        const token = useSelector((state)=> state.bearer)
        const env = useSelector((state) => state.env)
    
        console.log("env from app", env);
        
        useEffect(()=> {
            const toke= document.cookie.split(";")
            .find(ele => ele.split("=")[0].trim() ==="token")
            if (toke) {
                dispatch(setBearer(toke.replace("token=", "").trim()))
            }

        },[])
      
        /**

         */
        useEffect(()=> {
            if (token) {

                fetch("/api/private/env", {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }).then(ele => ele.json())
             
                .then(ele => {
  
                    console.log(ele);
                    dispatch(
                    setEnv({
                        ...ele
                    }))
                })

                fetch("/api/private/initMetadata", {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }).then(ele => ele.blob())
                .then(ele => JSZip.loadAsync(ele))
                .then(ele => {
                    const fileName = Object.keys(ele.files)[0]
                    return ele.file(fileName).async("string")
                })
                .then(ele => {
                    ele = JSON.parse(ele)
                    console.log("response", ele);
                    dispatch(setMetadata([
                        ...ele
                    ]))
                    dispatch(setFilterMetadata([
                        ...ele
                    ]))
                })
            }
        }, [token])


        return (
          <>
    
              <div className="grid2fr1frcol">
                <div>
                    <div  className="grid2col">
                        <div>
                            <MapBoxComponent></MapBoxComponent>
                        </div>
                        <div>
                            <FilterComponent></FilterComponent>
                        </div>
                    </div>

                    <div className="grid">
                        <StationPanelComponent></StationPanelComponent>
                    </div>

                </div>
                <div>
                    <MeantempPanelComponent></MeantempPanelComponent>
                </div>
              </div>
          </>
        )

    
}