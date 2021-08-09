import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Field,ErrorMessage} from 'formik'
import TextError from './TextError';
function InlineInput(props) {
    const {label,name,...rest} = props
    return (
        <div class="col-md-3 mb-3" >
            <label htmlFor={name}>{label}</label>
            <Field class="form-control form-control-sm" id={name} name = {name} {...rest} />
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default InlineInput
