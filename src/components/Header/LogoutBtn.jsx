import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

function LogoutBtn({...props}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        authService.logout()
            .then(() => {
                dispatch(logout())
                navigate('/')
            })
    }

    return (
        <button onClick={logoutHandler} {...props} className='inline-block w-full py-2 bg-white duration-200 hover:bg-blue-300 border-4 border-black'>Logout</button>
    )
}

export default LogoutBtn