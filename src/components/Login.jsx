import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'


function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')

    const login = async (data) => {
        // console.log(data);
        
        setError('')
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData))
                    navigate(0)
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center w-full p-3'>
            <div className='w-full max-w-lg px-3 mx-auto bg-gray-100 sm:p-10 py-7 rounded-xl border-black/10'>
                <div className='flex justify-center mb-2'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-2xl font-bold leading-tight text-center text-black'>Login To Your Account</h2>
                <p className='mt-2 text-base text-center text-black/60'>Don{"'"}t have any Account?&nbsp;
                    <Link to='/sign-up' className='font-medium transition-all duration-200 hover:underline'>Sign Up</Link>
                </p>
                {error && <p className='mt-8 text-center text-red-600'> {error} </p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5 text-left'>
                        <Input 
                        label='Email: '
                        placeholder='Enter Your Email'
                        labelClass='text-black' 
                        type='email' 
                        autoComplete='off'
                        {...register('email', {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address"
                            }
                        })} />

                        <Input 
                        label='Password: '
                        placeholder='Enter Your Password' 
                        labelClass='text-black' 
                        type='password' 
                        autoComplete='off'
                        {...register('password', {
                            required: true
                        })} />

                        <Button className='w-full' type='submit'>Sign In</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login