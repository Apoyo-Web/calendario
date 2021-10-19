import { types } from "../types/types"



export const eventAddNew = (event) =>( {
    type: types.eventAddNew,
    payload: event
})

export const eventSetActive = (event) =>( {
    type: types.eventActive,
    payload: event
})