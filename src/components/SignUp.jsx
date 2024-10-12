import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'



function SignUp() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')

    const create = async (data) => {
        // console.log(data);
        setError('')
        try {
            const account = await authService.createAccount(data)
            if (account) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData))
                }
                navigate(0)
            }
        } catch (error) {
            setError(error.massage)
        }
    }

    return (
        <div className="flex items-center justify-center p-3">
            <div className="w-full max-w-lg px-3 mx-auto bg-gray-100 border rounded-xl py-7 sm:p-10 border-black/10">
                <div className="flex justify-center mb-2">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-2xl font-bold leading-tight text-center text-black">Sign up to create account</h2>
                <p className="mt-2 text-base text-center text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium transition-all duration-200 text-primary hover:underline"
                    >Login In
                    </Link>
                </p>
                {error && <p className="mt-8 text-center text-red-600">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5 text-left'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            labelClass='text-black'
                            autoComplete='off'
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            labelClass='text-black'
                            type="email"
                            autoComplete='off'
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            labelClass='text-black'
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button type="submit" className="w-full">Create Account</Button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default SignUp