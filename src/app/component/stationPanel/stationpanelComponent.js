"user client"

import { useAppSelector } from "@/app/lib/hooks"
import StationComponent from "./station/stationComponent"


export default function StationPanelComponent() {

    const metadata = useAppSelector(state => state.metadata.filteredMetadata)
    const bearer = useAppSelector(state => state.bearer)

    return <>
        <div className="grid">

            {metadata.map( (ele, i) => 
                (<StationComponent key={i} station={ele} bearer={bearer}></StationComponent>))}
        </div>
    </>
}