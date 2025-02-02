"use client"

import mapboxgl from "mapbox-gl"

import 'mapbox-gl/dist/mapbox-gl.css';
import "./mapbox.css"
import { useEffect, useRef } from 'react';
import { ENV } from "../../gloabVariable";
import StoreProvider from "@/app/StoreProvider";
import { useSelector } from "react-redux";


export default  function MapBoxComponent() {

  const mapRef = useRef()
  const mapContainerRef = useRef()

  const env = useSelector((state) => state.env)
  const metadata = useSelector(state => state.metadata.filteredMetadata)
  const allMetadata = useSelector(state => state.metadata.metadata)
  const meanTemp = useSelector(state => state.meanTemp)
  const markersRef = useRef([]);
  const markersRef2 = useRef([]);
  
  useEffect(() => {
    
    if (env.MAPBOX_KEY && !mapRef.current) {
      mapboxgl.accessToken = env.MAPBOX_KEY
      console.log(mapboxgl.accessToken);
      
      
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [16.3738, 48.2082],
        zoom: 0.1
      });


      return () => {
        mapRef.current.remove()
      }
    } 
  }, [env])


  useEffect(()=> {
    if (!mapRef) return
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    metadata.forEach((station) => {
        const marker = new mapboxgl.Marker()
            .setLngLat([station.lng, station.lat])
            .setPopup(new mapboxgl.Popup().setText(station.stationName)) // Add popup with name
            .addTo(mapRef.current);

        markersRef.current.push(marker); // Store marker reference
    });
  }, [env, metadata])

  useEffect(()=> {
    if (!mapRef) return
    markersRef2.current.forEach(marker => marker.remove());
    markersRef2.current = [];

    const md = Object.keys(meanTemp).map(ele => allMetadata.find(md => md.id === ele))

    md.forEach((station) => {
        const marker = new mapboxgl.Marker({color: "red"})
            .setLngLat([station.lng, station.lat])
            .setPopup(new mapboxgl.Popup().setText(station.stationName)) // Add popup with name
            .addTo(mapRef.current);

        markersRef2.current.push(marker); // Store marker reference
    });
  }, [env, meanTemp, allMetadata])

  

  return (
    <>
      <div className="container">
        <div id='map-container' ref={mapContainerRef}/>
      </div>
    </>
  )
}



