import React from 'react'
import Input from './Input'
import Select from './Select'

function FormControl(props) {
    const {control, ...rest} = props
    switch(control){
        case 'input':
            return <Input {...rest} />
        case 'select':
            return <Select {...rest} />
    }
}

export default FormControl