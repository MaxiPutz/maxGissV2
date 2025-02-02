import { createSlice } from "@reduxjs/toolkit";


export const bearerSlice = createSlice({
    initialState: "",
    name: "bearer",
    reducers: {
        setBearer: (state, action) => {
            console.log("this is a aciont", action);
            
            return action.payload
        }    
    }
})

export const {setBearer} = bearerSlice.actions

