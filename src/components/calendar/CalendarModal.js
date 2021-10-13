import React, { useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import { customStyles } from '../../helpers/customStyleModal';
import './modal.css'
import moment from 'moment';



Modal.setAppElement('#root');
export const CalendarModal = () => {

    const now = moment().minute(0).seconds(0).add(1, 'hours')
    const end = now.clone().add(1,'hours')
  
    const [isOpen, setIsOpen] = useState(true)
    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(end.toDate());

    const [formValues, setFormValues] = useState({
        
        title: 'Evento',
        notes: '',
        start: now.toDate(),
        end: end.toDate()
    })

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
            start: e
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()

        console.log(formValues)

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
            className="form-control"
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