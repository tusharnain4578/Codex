import React from 'react'
import './LoadingSpinner.css'

export const LoadingSpinner = (props) => {

    return (
        <div class={`cover-spin ${props.show ? `` : `d-none`}`}></div>
    )
}

export default LoadingSpinner