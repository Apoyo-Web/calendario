import React, { useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2'
import { customStyles } from '../../helpers/customStyleModal';
import './modal.css'
import moment from 'moment';



Modal.setAppElement('#root');
export const CalendarModal = () => {

    const now = moment().minute(0).seconds(0).add(1, 'hours')
    const endDate = now.clone().add(1,'hours')
  
    const [isOpen, setIsOpen] = useState(true)
    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(endDate.toDate());
    const [titleValid, setTitleValid] = useState(true)  

    const [formValues, setFormValues] = useState({
        
        title: 'Evento',
        notes: '',
        start: now.toDate(),
        end: endDate.toDate()
    })

    const {notes, title, start, end} = formValues

    const handleOnChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }
    const closeModal = () => {
        setIsOpen(false)
    }

    const handleStartDateChange = (e) => {
        setDateStart(e)
        setFormValues({
            ...formValues,
            start: e
        })
    }
    const handleEndDateChange = (e) => {
        setDateEnd(e)
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

        setTitleValid(true)

        closeModal()

    }
    return (
        <Modal
        isOpen={true}
        
        onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >

<h1> Nuevo evento </h1>
<hr />
<form className="container" onSubmit={handleSubmitForm}>

    <div className="form-group">
        <label>Fecha y hora inicio</label>
        <DateTimePicker
        onChange={handleStartDateChange}
        value={dateStart}
        className="form-control"
      />
    </div>

    <div className="form-group">
        <label>Fecha y hora fin</label>
        <DateTimePicker
        onChange={handleEndDateChange}
                        value={dateEnd}
                        minDate={dateStart}
        className="form-control"
      />
    </div>

    <hr />
    <div className="form-group">
        <label>Titulo y notas</label>
        <input 
            type="text" 
                        className={`form-control ${!titleValid && "is-invalid"} `}
            placeholder="Título del evento"
            name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={handleOnChange}
        />
        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
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
        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
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
