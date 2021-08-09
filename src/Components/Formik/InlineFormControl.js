import React from 'react'
import InlineInput from './InlineInput'
function InlineFormControl(props) {
    const {control, ...rest} = props
    switch(control){
        case 'input':
            return <InlineInput {...rest} />
    }
}

export default InlineFormControl
