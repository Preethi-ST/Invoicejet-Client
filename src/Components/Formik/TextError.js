import React from 'react'

function TextError(props) {
    return (
        <div style = {{color:"red",fontSize:'15px',paddingTop:'2px'}}>
            {props.children}
        </div>
    )
}

export default TextError