const { createSlice } = require("@reduxjs/toolkit");


export const mapSlice = createSlice({
    name: "mapView",
    initialState: {
        viewPoint: {
            minLat: -90,
            maxLat: 90,
            minLng: -188,
            maxLng: 180,
        }
    },
    reducers: {
        setViewPoint: (state, action) => {
            state.viewPoint = action.payload
        }
    }
})


export const { setViewPoint } =  mapSlice.actions

