import moment from 'moment'

import { types } from '../types/types'

const initialState = {
    events: [

        {
            title: 'Cumpleaños de Beatriz',
            start: moment().toDate(),
            end: moment().add(2, 'hours').toDate(),
            bgcolor: '#fafafa',
            user: {
                _id: '123',
                name: 'Victor'
            }
        }
    ],
    

    activeEvent: null

}

export const calendarReducer = (state = initialState, action) => {
    

    switch (action.type) {
        
        case types.eventActive:

            return {
                ...state,
                activeEvent: action.payload
            }
        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]

            }
        case types.eventClearActive:
            return {
                ...state,
                activeEvent: null
            }
        default:
           return state
    }
}