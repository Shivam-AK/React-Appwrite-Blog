import { useState } from 'react'
import { Button, Input, Logo } from '../components/index'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function ChangePassword() {

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
    <div className='flex items-center justify-center w-full p-3 my-10'>
      <div className='w-full max-w-lg px-4 mx-auto bg-gray-100 py-7 sm:p-10 rounded-xl border-black/10'>
        <div className='flex justify-center mb-2'>
          <span className='inline-block w-full max-w-[100px]'>
            <Logo width='100%' />
          </span>
        </div>
        <h2 className='text-2xl font-bold leading-tight text-center text-black'>Change Password</h2>

        {error && <p className='mt-8 text-center text-red-600'> {error} </p>}
        {success && <p className='mt-8 text-center text-green-600'> {success} </p>}
        <form onSubmit={handleSubmit(updatePassword)} className='mt-8'>
          <div className='space-y-5 text-left'>
            <Input label='Old Password: ' placeholder='Enter Old Password' labelClass='text-black' type='password'
              {...register('oldPassword')} />

            <Input label='New Password: ' placeholder='Enter New Password' labelClass='text-black' type='password'
              {...register('newPassword', {
                required: true
              })} />

            <Button className='w-full' type='submit'>Update Password</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword