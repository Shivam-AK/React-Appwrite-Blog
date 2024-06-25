import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from '../components/index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'


function ChangePassword() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const updatePassword = async (data) => {
    // console.log(data);

    setError('')
    try {
      const result = await authService.updatePassword(data)
      if (result) {
        // const userData = await authService.getCurrentUser()
        setSuccess('Successfully Update Password!')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className='flex items-center justify-center w-full my-10'>
      <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border-black/10'>
        <div className='mb-2 flex justify-center'>
          <span className='inline-block w-full max-w-[100px]'>
            <Logo width='100%' />
          </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight text-black'>Change Password</h2>

        {error && <p className='text-red-600 mt-8 text-center'> {error} </p>}
        {success && <p className='text-green-600 mt-8 text-center'> {success} </p>}
        <form onSubmit={handleSubmit(updatePassword)} className='mt-8'>
          <div className='space-y-5 text-left'>
            <Input label='Old Password: ' placeholder='Enter Old Password' labelClass='text-black' type='password'
              {...register('oldPassword')} />

            <Input label='New Password: ' placeholder='Enter New Password' labelClass='text-black' type='password'
              {...register('newPassword', {
                required: true
              })} />

            <Button children='Update Password' className='w-full' type='submit' />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword