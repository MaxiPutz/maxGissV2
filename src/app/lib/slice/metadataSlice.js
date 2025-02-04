
const { createSlice } = require("@reduxjs/toolkit");



export const metadataSlice = createSlice({
    name: "metadata",
    /**
     * @type
     * @param {Metadata[]} metadata
     * @param {Metadata[]} filteredMetadata
     */
    initialState: {
        metadata: [],
        filteredMetadata: []
    },
    /**
     * 
     * @param {Metadata []} state 
     * @param {Metadata[]>} action 
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


