import React, { useState } from "react";
import { Check, Map, CalendarRange, Ruler } from "lucide-react";
import styles from "./StationRadioCard.module.css"; // Your CSS module
import { setMeanTemp } from "@/app/lib/slice/meanTempSlicer";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function StationRadioCard({ stations4V, token, dispatch, gissV2Metadata }) {
  // A function to handle station selection

  const [cardIndex, setCardIndex] = useState(-1)

  /**
   * 
   * @param {Metadata} ele 
   * @param {*} i 
   */
  const handleStationSelect = (ele, i) => {
    console.log(ele);
    fetch(`${basePath}/api/private/nasa/v4Data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({ id: ele.v4Id }),
    })
      .then((resp) => resp.json())
      .then((data) => {

        const dataWithStationName = Object.entries(data.data).reduce((prev, [key, val])=>({
          ...prev,
          [key] : val.map(e => ({...e, name: ele.stationName}))
        }),{})
        console.log(dataWithStationName, "dataWithStationanme");
        
        dispatch(setMeanTemp({ id: gissV2Metadata.id, data: dataWithStationName }));
        console.log(data);
      });
    setCardIndex(i)
  };

  return (
    <div className={styles.cardContainer}>
      {stations4V.slice(0, 35).map((ele, i) => (
        <div key={i} className={`${styles.stationCard} ${i === cardIndex ? styles.highlight : ""}`} onClick={() => handleStationSelect(ele, i)} >
          <div className={styles.cardHeader}>
            <h3 className={styles.stationName}>{ele.stationName}</h3>

          </div>
          <div className={styles.cardBody}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Ruler />{ele.distance}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", }}>
              <Map />
                Lat: {Number(ele.lat).toFixed(2)} <br></br>
                Lng: {Number(ele.lng).toFixed(2)}

            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <CalendarRange /> {ele.yearFrom} -  {ele.yearTo}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

