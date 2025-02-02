
const { createSlice } = require("@reduxjs/toolkit");



export const metadataSlice = createSlice({
    name: "metadata",
    /**
     * @type
     * @param {import("../store").Metadata[]} metadata
     * @param {import("../store").Metadata[]} filteredMetadata
     */
    initialState: {
        metadata: [],
        filteredMetadata: []
    },
    /**
     * 
     * @param {import("../store").Metadata []} state 
     * @param {import("@reduxjs/toolkit").PayloadAction<import("../store").Metadata[]>} action 
     */
    reducers: { 
        setMetadata: (state, action) => {
            console.log("this is a action", action);
            state.metadata = action.payload
        },
        setFilterMetadata: (state, action) =>  {
            state.filteredMetadata = action.payload
        }
    }
})


export const {setMetadata, setFilterMetadata} = metadataSlice.actions


