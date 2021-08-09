import React from 'react'
import TextError from './TextError'
import {Field,ErrorMessage} from 'formik'
function Select(props) {
    const {label,name,options, ...rest} = props
    return (
        <div className = 'form-group'>
            <h4 style={{float:'left'}}><label htmlFor = {name} className="control-label logo-text display-5">{label}</label></h4>
            <Field as="select" name={name} id={name} className="form-control form-control-sm" {...rest} width ='5'>
                <option value=''></option>
                {
                    options.map(option => {
                        return (
                            <option key={option.key} value={option.value}>{option.key}</option>
                        )
                    })
                }
            </Field>
            <ErrorMessage name={name} component = {TextError} />
        </div>
    )
}

export default Select
