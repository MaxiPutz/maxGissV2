import { configureStore } from '@reduxjs/toolkit'
import { metadataSlice } from './slice/metadataSlice'
import { bearerSlice } from './slice/bearer'
import { envSlice } from './slice/envSlicer'
import { meanTempSlicer } from './slice/meanTempSlicer'
import { createWrapper } from 'next-redux-wrapper'



/**
 * @typedef {Object} Metadata
 * @property {String} id
 * @property {String} stationName
 * @property {Number} lat
 * @property {Number} lng
 * @property {Number} population
 * @property {Number} yearFrom
 * @property {Number} yearTo
 * 
*/
export const makeStore = () => {
  return configureStore({
    reducer: {
        meanTemp: meanTempSlicer.reducer,
        bearer: bearerSlice.reducer,
        metadata: metadataSlice.reducer,
        env: envSlice.reducer
        }

    })
}

export const wrapper = createWrapper(makeStore)