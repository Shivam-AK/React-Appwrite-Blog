import React, { useId, useState } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className = '',
    labelClass = '',
    ...props
}, ref) {

    const id = useId()
    const [icon, setIcon] = useState('M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07A3 3 0 119.88 9.88M1 1 23 23')

    return (

        <div className='w-full relative'>
            {label && <label className={`inline-block mb-1 pl-1 ${labelClass}`} htmlFor={id}>
                {label}
            </label>}
            <div className='flex items-center'>
                <input type={type} className={`px-3 py-2 bg-white text-black outline-none focus:border-black duration-300 relative border-2 w-full ${className}`} id={id} ref={ref} {...props} />
                {
                    type === 'password' &&
                    <span
                        id={id}
                        className='cursor-pointer select-none absolute right-0 text-white bg-blue-600 rounded-full p-2'
                        onClick={() => {
                            const input = document.getElementById(`${id}`)
                            if (input.getAttribute('type') === 'password') {

                                input.setAttribute('type', 'text')
                                setIcon('M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zm8 0a1 1 0 006 0 1 1 0 00-6 0Z')
                            } else {

                                input.setAttribute('type', 'password')
                                setIcon('M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07A3 3 0 119.88 9.88M1 1 23 23')
                            }
                        }}
                    ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d={icon} strokeLinecap="round" stroke="#FFF" strokeWidth="2" fill="none" /></svg></span>
                }
            </div>
        </div>
    )
})

export default Input