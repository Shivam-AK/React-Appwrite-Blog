import React from 'react'
import reactLogo from '../assets/react.svg'

function Logo({logoWidth = 100}) {
    return (
            <img src={reactLogo}  alt="React logo" width={`${logoWidth}px`} />
    )
}

export default Logo
