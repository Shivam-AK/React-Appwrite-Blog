import React from 'react'

function Button({

    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-White',
    className = '',
    ...props
}) {
    return (
        <button className={`pt-3 pb-3 rounded-full ${bgColor} ${textColor} ${className}`} type={type} {...props}> {children} </button>
    )
}

export default Button