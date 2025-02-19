

import { createSlice } from "@reduxjs/toolkit";



export const meanTempSlicer = createSlice({
    name: "meanTempSlicer",
    initialState: {},
    reducers: {
        setMeanTemp: (state, action) => {
            state[action.payload.id] = { ...state[action.payload.id] ,...action.payload.data}

            console.log("from reduxstate",  { ...state});
            
        }
    }
})

export const {setMeanTemp} = meanTempSlicer.actions