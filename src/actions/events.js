import { types } from "../types/types"



export const eventAddNew = (event) =>( {
    type: types.eventAddNew,
    payload: event
})

export const eventSetActive = (event) =>( {
    type: types.eventActive,
    payload: event
})

export const eventClearActive = () => ({
    type: types.eventClearActive
})

export const eventUpdate = (event) => ({
    type: types.eventUpdate,
    payload: event
})

export const eventDeleted = ()=>({type: types.eventDeleted})