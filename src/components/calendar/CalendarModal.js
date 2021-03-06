import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2'
import { customStyles } from '../../helpers/customStyleModal';
import './modal.css'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActive, eventSetActive, eventUpdate } from '../../actions/events';

const now = moment().minute(0).seconds(0).add(1, 'hours')
    const endDate = now.clone().add(1,'hours')
const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: endDate.toDate()
}
Modal.setAppElement('#root');
export const CalendarModal = () => {

    const dispatch = useDispatch()
    
  
    const open = useSelector(state => state.ui.modalOpen)
    const {activeEvent} = useSelector(state => state.calendar)
    
    
    
    
    const [titleValid, setTitleValid] = useState(true)  

    const [formValues, setFormValues] = useState(initEvent)

    const { title, start, end } = formValues
    
    useEffect(() => {
        
        if (activeEvent) {
            setFormValues(activeEvent)
        } else {
            setFormValues(initEvent)
        }
    }, [activeEvent])

    const handleOnChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }
    const closeModal = () => {
        dispatch(uiCloseModal())
        dispatch(eventClearActive())
        setFormValues(initEvent)
    }

    const handleStartDateChange = (e) => {
        
        setFormValues({
            ...formValues,
            start: e
        })
    }
    const handleEndDateChange = (e) => {
        
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()

        const momentStart = moment(start)
        const momentEnd = moment(end)

       

        if (momentStart.isSameOrAfter(momentEnd)) {
            Swal.fire('Error', 'La fecha fin debe ser mayor que la fecha de inicio', 'error')
            return
        }

        if (title.trim().length < 2) {
            
            return setTitleValid(false)
        }

        if (activeEvent) {
            dispatch(eventUpdate(formValues))
        } else {
            dispatch(eventAddNew({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    _id: '123',
                    name: 'Fernando'

                }
            
            }))
        }
        
        setTitleValid(true)

        closeModal()

    }
    return (
        <Modal
        isOpen={open}
        
        onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >

<h1> {(activeEvent)?'Editar Evento' : 'Nuevo Evento'  } </h1>
<hr />
<form className="container" onSubmit={handleSubmitForm}>

    <div className="form-group">
        <label>Fecha y hora inicio</label>
        <DateTimePicker
        onChange={handleStartDateChange}
        value={start}
        className="form-control"
      />
    </div>

    <div className="form-group">
        <label>Fecha y hora fin</label>
        <DateTimePicker
        onChange={handleEndDateChange}
                        value={end}
                        minDate={start}
        className="form-control"
      />
    </div>

    <hr />
    <div className="form-group">
        <label>Titulo y notas</label>
        <input 
            type="text" 
                        className={`form-control ${!titleValid && "is-invalid"} `}
            placeholder="T??tulo del evento"
            name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={handleOnChange}
        />
        <small id="emailHelp" className="form-text text-muted">Una descripci??n corta</small>
    </div>

    <div className="form-group">
        <textarea 
            type="text" 
            className="form-control"
            placeholder="Notas"
            rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={handleOnChange}
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Informaci??n adicional</small>
    </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
    >
        <i className="far fa-save"></i>
        <span> Guardar</span>
    </button>

</form>
            
        </Modal>
    )
}
