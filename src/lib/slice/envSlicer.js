import { ENV } from "@/app/gloabVariable";

const { createSlice } = require("@reduxjs/toolkit");



export const envSlice = createSlice({
    name: "env",
    /**
     * @type {import("@/app/gloabVariable").ENVObject}
     */
    initialState: {},
    reducers: {
        setEnv: (state,action) => {
            console.log("env set slice", action);
            return {...action.payload}
            
        }
    }    
})


export const {setEnv} = envSlice.actions