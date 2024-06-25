import React, { useId } from 'react'

function Select({
    options = [],
    label,
    className = '',
    ...props
}, ref) {

    const id = useId()
    return (

        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1' htmlFor={id}>
                {label}
            </label>}
            <select name="" className={`px-3 py-2 bg-white text-black outline-none focus:border-black duration-300 border-2 border-white w-full ${className}`} id={id} ref={ref} {...props}>
                {
                    options?.map(option => (
                        <option value={option} key={option}> {option} </option>
                    ))
                }
            </select>
        </div>
    )
}

export default React.forwardRef(Select)

