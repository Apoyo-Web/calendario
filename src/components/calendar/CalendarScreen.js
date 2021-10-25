import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
import "react-big-calendar/lib/css/react-big-calendar.css";



import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/Calendar-messafes-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActive, eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';




moment.locale('es')
const localizer = momentLocalizer(moment)



export const CalendarScreen = () => {
    const dispatch = useDispatch()
    const {events, activeEvent} = useSelector(state => state.calendar)
    console.log(events)

   const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    const onDoubleClick = (e) => {
        dispatch(eventSetActive(e))
       dispatch(uiOpenModal())
    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e))
        
    }
    const onViewChange = (e) => {
        setLastView(e)
        localStorage.setItem('lastView',e)
    }

    const onSelectSlot = (e) => {
        dispatch(eventClearActive())
    }
    const eventStyleGetter = (event, start, end, isSelected) => {
        
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    }
    
    return (
        <div>
            <Navbar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "90vh" }}
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onSelectSlot={onSelectSlot}
                selectable = {true}
                onView={onViewChange}
                view= {lastView}
                components={{
                    event: CalendarEvent
                }}

                
            />

            <AddNewFab />

            {(activeEvent) &&
                <DeleteEventFab />}
           
            <CalendarModal />
        </div>
    )
}
