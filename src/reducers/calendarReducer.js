import moment from 'moment'
import { eventSetActive } from '../actions/events'
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
    
console.log(action.payload)
    switch (action.type) {
        
        case types.eventActive:

            return {
                ...state,
                activeEvent: action.payload
            }
        default:
           return state
    }
}